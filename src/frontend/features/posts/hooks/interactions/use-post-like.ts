"use client";

import { useMutation } from "@tanstack/react-query";

import { postLikeApi } from "@/frontend/features/posts/api/post-like.api";

type PostLikeVariables = {
  postId: string;
  liked: boolean;
};

export function usePostLike() {
  return useMutation({
    mutationFn: ({ postId, liked }: PostLikeVariables) => {
      return liked
        ? postLikeApi.unlikePost(postId)
        : postLikeApi.likePost(postId);
    },
  });
}
