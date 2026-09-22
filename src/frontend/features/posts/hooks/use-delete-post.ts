"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postService } from "@/frontend/features/posts/api/posts-api";

import { postKeys } from "@/frontend/features/posts/hooks/use-posts";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postService.deletePost(postId),

    onSuccess: (_, postId) => {
      queryClient.removeQueries({
        queryKey: postKeys.detail(postId),
      });

      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });
    },
  });
}
