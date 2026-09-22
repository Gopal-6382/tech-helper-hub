"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postService } from "@/frontend/features/posts/api/posts-api";

import { postKeys } from "@/frontend/features/posts/hooks/use-posts";

type PostSaveVariables = {
  postId: string;
  saved: boolean;
};

export function usePostSave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, saved }: PostSaveVariables) =>
      saved ? postService.unsavePost(postId) : postService.savePost(postId),

    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: postKeys.detail(postId),
      });
    },
  });
}
