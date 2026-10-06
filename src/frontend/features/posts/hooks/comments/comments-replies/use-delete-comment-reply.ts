import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentReplyApi } from "@/features/posts/api/comment-reply.api";
import { commentReplyKeys } from "./use-comment-replies";

type DeleteCommentReplyVariables = {
  replyId: string;
  commentId: string;
};

export function useDeleteCommentReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ replyId }: DeleteCommentReplyVariables) =>
      commentReplyApi.deleteCommentReply(replyId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentReplyKeys.comment(variables.commentId),
      });
    },
  });
}
