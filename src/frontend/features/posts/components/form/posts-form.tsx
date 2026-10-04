"use client";

import {  useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { z } from "zod";

import { Button } from "@/frontend/components/ui/button";
import { createPostSchema } from "@/modules/posts/validations/post.validation";
import { useCreatePost } from "@/frontend/features/posts/hooks/posts/use-create-post";
import { useUpdatePost } from "@/frontend/features/posts/hooks/posts/use-update-post";
import { uploadImages } from "../media/upload";
import type { Post } from "@/frontend/features/posts/types/post.types";

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
    post?.images ?? []
  );
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

  const handleSelectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    setSelectedFiles(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    setNewImageUrls([]);
    setUploadError(null);
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const urls = await uploadImages(selectedFiles);

      setNewImageUrls(urls);
      form.setValue("images", [...existingImageUrls, ...urls], {
        shouldValidate: true,
      });
    } catch {
      setUploadError("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeExistingImage = (index: number) => {
    const nextExistingImages = existingImageUrls.filter(
      (_, imageIndex) => imageIndex !== index
    );

    setExistingImageUrls(nextExistingImages);
    form.setValue("images", [...nextExistingImages, ...newImageUrls], {
      shouldValidate: true,
    });
  };

  const removeNewImage = (index: number) => {
    const nextNewImages = newImageUrls.filter(
      (_, imageIndex) => imageIndex !== index
    );

    setNewImageUrls(nextNewImages);
    form.setValue("images", [...existingImageUrls, ...nextNewImages], {
      shouldValidate: true,
    });
  };

  const clearSelectedFiles = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setSelectedFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: CreatePostFormOutput) => {
    if (selectedFiles.length > 0 && newImageUrls.length === 0) {
      setUploadError("Please upload selected images before saving the post.");
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
      } else {
        const createdPost = await createMutation.mutateAsync({
          ...data,
          images,
        });

        router.push(`/web/posts/${createdPost.id}`);
      }
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
      <div>
        <label htmlFor="categoryId" className="mb-2 block text-sm font-medium">
          Category
        </label>

        <input
          id="categoryId"
          {...form.register("categoryId")}
          className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
        />

        {form.formState.errors.categoryId && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.categoryId.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Title
        </label>

        <input
          id="title"
          {...form.register("title")}
          className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
        />

        {form.formState.errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          id="content"
          {...form.register("content")}
          rows={8}
          className="w-full resize-y rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
        />

        {form.formState.errors.content && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="images" className="mb-2 block text-sm font-medium">
          Images
        </label>

        <input
          ref={fileInputRef}
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleSelectImages}
          className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
        />

        {existingImageUrls.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">Current images</p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {existingImageUrls.map((url, index) => (
                <div
                  key={url}
                  className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
                >
                  <Image
                    src={url}
                    alt={`Current image ${index + 1}`}
                    fill
                    className="object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                    aria-label="Remove existing image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewUrls.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">New images</p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {previewUrls.map((url, index) => (
                <div
                  key={url}
                  className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
                >
                  <Image
                    src={url}
                    alt={`Selected image ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                    aria-label="Remove selected image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              onClick={handleUploadImages}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload images"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              disabled={isUploading}
              onClick={clearSelectedFiles}
            >
              Clear
            </Button>
          </div>
        )}

        {newImageUrls.length > 0 && (
          <p className="mt-2 text-sm text-green-600">
            {newImageUrls.length} new image
            {newImageUrls.length > 1 ? "s" : ""} uploaded.
          </p>
        )}

        {uploadError && (
          <p className="mt-2 text-sm text-red-600">{uploadError}</p>
        )}
      </div>

      {mutationError && (
        <p role="alert" className="text-sm text-red-600">
          {mutationError instanceof Error
            ? mutationError.message
            : isEditing
              ? "Unable to update post."
              : "Unable to create post."}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending || isUploading}
        className="w-full"
      >
        {isPending
          ? isEditing
            ? "Updating..."
            : "Creating..."
          : isEditing
            ? "Update post"
            : "Create post"}
      </Button>
    </form>
  );
}