import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "@/features/posts/api/comment.api";
import { commentKeys } from "./use-comments";

type DeleteCommentVariables = {
  commentId: string;
  postId: string;
};

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: DeleteCommentVariables) =>
      commentApi.deleteComment(commentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.post(variables.postId),
      });

      // Refresh post._count.comments
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
