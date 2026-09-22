"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postService } from "@/frontend/features/posts/api/posts-api";

import { postKeys } from "@/frontend/features/posts/hooks/use-posts";

import type { UpdatePostInput } from "@/frontend/features/posts/schema/post.validation";

type UpdatePostVariables = {
  postId: string;
  data: UpdatePostInput;
};

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }: UpdatePostVariables) =>
      postService.updatePost(postId, data),

    onSuccess: (post) => {
      queryClient.setQueryData(postKeys.detail(post.id), post);

      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });
    },
  });
}
