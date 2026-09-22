// src/frontend/components/posts/post-form.tsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { createPostSchema } from "@/modules/posts/validations/post.validation";

import type { CreatePostData } from "@/modules/posts/validations/post.validation";

import { useCreatePost } from "../hooks/use-create-post";

export function PostForm() {
  const router = useRouter();
  const createMutation = useCreatePost();

  type CreatePostFormData = Omit<CreatePostData, "authorId"> & {
    images: string[];
  };

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  async function onSubmit(data: CreatePostFormData) {
    try {
      const post = await createMutation.mutateAsync(data as CreatePostData);

      router.push(`/web/posts/${post.id}`);
    } catch {
      // Mutation error is displayed below.
    }
  }

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
        <label htmlFor="city" className="mb-2 block text-sm font-medium">
          City
        </label>

        <input
          id="city"
          {...form.register("city")}
          className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
        />
      </div>

      {createMutation.isError && (
        <p role="alert" className="text-sm text-red-600">
          {createMutation.error instanceof Error
            ? createMutation.error.message
            : "Unable to create post."}
        </p>
      )}

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        {createMutation.isPending ? "Creating..." : "Create post"}
      </button>
    </form>
  );
}
