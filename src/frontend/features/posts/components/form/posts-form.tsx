"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createPostSchema } from "@/modules/posts/validations/post.validation";

import { useCreatePost } from "@/frontend/features/posts/hooks/posts/use-create-post";
import { useUpdatePost } from "@/frontend/features/posts/hooks/posts/use-update-post";
import { uploadPostImages } from "@/frontend/features/posts/api/post-upload-api";

import type { Post } from "@/frontend/features/posts/types/post.types";

import {
  CategorySelectField,
  ImageUploadField,
  SubmitButton,
  TextField,
  TextareaField,
} from "@/frontend/components/form";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE_MB = 5;

type CreatePostFormValues = z.input<typeof createPostSchema>;
type CreatePostFormOutput = z.output<typeof createPostSchema>;

type PostFormProps = {
  post?: Post;
};

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();

  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  const isEditing = Boolean(post);
  const isPending = createMutation.isPending || updateMutation.isPending;

  const mutationError = createMutation.error ?? updateMutation.error;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    post?.images ?? [],
  );

  // These are already uploaded to Cloudinary.
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<CreatePostFormValues, unknown, CreatePostFormOutput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      categoryId: post?.categoryId ?? "",
      title: post?.title ?? "",
      content: post?.content ?? "",
      images: post?.images ?? [],
    },
  });

  const clearSelectedFiles = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setSelectedFiles([]);
    setPreviewUrls([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    setUploadError(null);

    const totalImages =
      existingImageUrls.length + newImageUrls.length + files.length;

    if (totalImages > MAX_IMAGES) {
      setUploadError(
        `You can upload a maximum of ${MAX_IMAGES} images per post.`,
      );
      return;
    }

    const invalidType = files.some((file) => !file.type.startsWith("image/"));

    if (invalidType) {
      setUploadError("Only image files are allowed.");
      return;
    }

    const tooLarge = files.some(
      (file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024,
    );

    if (tooLarge) {
      setUploadError(`Each image must be ${MAX_FILE_SIZE_MB}MB or smaller.`);
      return;
    }

    // Revoke previews from a previous pending selection.
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setSelectedFiles(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleUploadImages = async () => {
    if (isUploading || selectedFiles.length === 0) {
      return;
    }

    const totalImages =
      existingImageUrls.length + newImageUrls.length + selectedFiles.length;

    if (totalImages > MAX_IMAGES) {
      setUploadError(
        `You can have a maximum of ${MAX_IMAGES} images per post.`,
      );
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadedUrls = await uploadPostImages(selectedFiles);

      if (!uploadedUrls.length) {
        throw new Error("Image upload returned no URLs.");
      }

      setNewImageUrls((currentUrls) => {
        const nextUrls = [...currentUrls, ...uploadedUrls];

        const allImages = [...existingImageUrls, ...nextUrls];

        form.setValue("images", allImages, {
          shouldValidate: true,
          shouldDirty: true,
        });

        return nextUrls;
      });

      clearSelectedFiles();
    } catch (error) {
      console.error("Image upload failed:", error);

      setUploadError(
        error instanceof Error
          ? error.message
          : "Failed to upload images. Please try again.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeExistingImage = (index: number) => {
    const nextExistingImages = existingImageUrls.filter(
      (_, imageIndex) => imageIndex !== index,
    );

    setExistingImageUrls(nextExistingImages);

    form.setValue("images", [...nextExistingImages, ...newImageUrls], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeNewImage = (index: number) => {
    const nextNewImages = newImageUrls.filter(
      (_, imageIndex) => imageIndex !== index,
    );

    setNewImageUrls(nextNewImages);

    form.setValue("images", [...existingImageUrls, ...nextNewImages], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: CreatePostFormOutput) => {
    // Selected files that haven't been uploaded yet
    // must never be silently ignored.
    if (selectedFiles.length > 0) {
      setUploadError(
        "Please upload the selected images before saving the post.",
      );
      return;
    }

    const images = [...existingImageUrls, ...newImageUrls];

    try {
      if (post) {
        await updateMutation.mutateAsync({
          postId: post.id,
          data: {
            ...data,
            images,
          },
        });

        router.push(`/web/posts/${post.id}`);
        return;
      }

      const createdPost = await createMutation.mutateAsync({
        ...data,
        images,
      });

      router.push(`/web/posts/${createdPost.id}`);
    } catch (error) {
      console.error("Error creating/updating post:", error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-2xl space-y-6"
      noValidate
    >
      <CategorySelectField
        control={form.control}
        name="categoryId"
        label="Category"
        placeholder="Choose a category"
        required
      />

      <TextField
        control={form.control}
        name="title"
        label="Title"
        placeholder="Enter post title"
        required
      />

      <TextareaField
        control={form.control}
        name="content"
        label="Description"
        placeholder="Write your post description..."
        rows={8}
        required
      />

      <ImageUploadField
        fileInputRef={fileInputRef}
        existingImageUrls={existingImageUrls}
        previewUrls={previewUrls}
        selectedFiles={selectedFiles}
        newImageUrls={newImageUrls}
        isUploading={isUploading}
        uploadError={uploadError}
        onSelectImages={handleSelectImages}
        onUploadImages={handleUploadImages}
        onClearSelectedFiles={clearSelectedFiles}
        onRemoveExistingImage={removeExistingImage}
        onRemoveNewImage={removeNewImage}
      />

      {mutationError && (
        <p role="alert" className="text-sm text-red-600">
          {mutationError instanceof Error
            ? mutationError.message
            : isEditing
              ? "Unable to update post."
              : "Unable to create post."}
        </p>
      )}

      <SubmitButton
        isSubmitting={isPending}
        disabled={isUploading}
        loadingText={isEditing ? "Updating..." : "Creating..."}
        className="w-full"
      >
        {isEditing ? "Update post" : "Create post"}
      </SubmitButton>
    </form>
  );
}
