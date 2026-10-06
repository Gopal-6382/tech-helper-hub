import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "@/features/posts/api/comment.api";
import { commentKeys } from "./use-comments";

type UpdateCommentVariables = {
  commentId: string;
  postId: string;
  content: string;
};

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentVariables) =>
      commentApi.updateComment(commentId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.post(variables.postId),
      });
    },
  });
}
