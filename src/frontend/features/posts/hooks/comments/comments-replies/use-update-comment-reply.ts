import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentReplyApi } from "@/features/posts/api/comment-reply.api";
import { commentReplyKeys } from "./use-comment-replies";

type UpdateCommentReplyVariables = {
  replyId: string;
  commentId: string;
  content: string;
};

export function useUpdateCommentReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ replyId, content }: UpdateCommentReplyVariables) =>
      commentReplyApi.updateCommentReply(replyId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentReplyKeys.comment(variables.commentId),
      });
    },
  });
}
