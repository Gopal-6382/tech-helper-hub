"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postViewApi } from "@/frontend/features/posts/api/post-view.api";

import { postKeys } from "@/frontend/features/posts/hooks/posts/use-posts";

export function usePostView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postViewApi.viewPost(postId),

    onSuccess: (_, postId) => {
      queryClient.setQueryData(postKeys.detail(postId), (oldPost: any) => {
        if (!oldPost) return oldPost;

        return {
          ...oldPost,
          viewCount: (oldPost.viewCount ?? 0) + 1,
        };
      });
    },
  });
}
