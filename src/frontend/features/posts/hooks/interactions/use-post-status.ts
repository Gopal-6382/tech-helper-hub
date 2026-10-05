"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postApi } from "@/frontend/features/posts/api/updatepost-status";
import { postKeys } from "@/frontend/features/posts/hooks/posts/use-posts";
import { UpdatePostStatusInput } from "@/backend/modules/posts/validations/post.validation";

export function useUpdatePostStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      status,
    }: {
      postId: string;
      status: UpdatePostStatusInput;
    }) => postApi.updatePostStatus(postId, status),

    onSuccess: (post) => {
      queryClient.setQueryData(postKeys.detail(post.id), post);

      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });
    },
  });
}
