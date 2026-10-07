"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postApi } from "@/frontend/features/posts/api/updatepost-status";

import { postKeys } from "@/frontend/features/posts/hooks/posts/use-posts";

import type { UpdatePostStatusInput } from "@/modules/posts/validations/post.validation";

type UpdatePostVariables = {
  postId: string;
  data: UpdatePostStatusInput;
};

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }: UpdatePostVariables) =>
      postApi.updatePostStatus(postId, data),

    onSuccess: (post) => {
      queryClient.setQueryData(postKeys.detail(post.id), post);

      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });
    },
  });
}
