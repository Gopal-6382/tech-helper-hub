"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postService } from "@/frontend/features/posts/api/posts-api";

import { postKeys } from "@/frontend/features/posts/hooks/use-posts";

import type { CreatePostInput } from "@/modules/posts/validations/post.validation";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostInput) => postService.createPost(data),

    onSuccess: (post) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });

      queryClient.setQueryData(postKeys.detail(post.id), post);
    },
  });
}
