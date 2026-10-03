"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postLikeApi } from "@/frontend/features/posts/api/post-like.api";

import { postKeys } from "@/frontend/features/posts/hooks/posts/use-posts";

type PostLikeVariables = {
  postId: string;
  liked: boolean;
};

export function usePostLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, liked }: PostLikeVariables) =>
      liked ? postLikeApi.unlikePost(postId) : postLikeApi.likePost(postId),

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
