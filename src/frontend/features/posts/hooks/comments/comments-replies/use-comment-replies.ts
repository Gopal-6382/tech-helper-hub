import { useQuery } from "@tanstack/react-query";

import { commentReplyApi } from "@/features/posts/api/comment-reply.api";

export const commentReplyKeys = {
  all: ["comment-replies"] as const,
  comment: (commentId: string) => ["comment-replies", commentId] as const,
};

export function useCommentReplies(commentId: string) {
  return useQuery({
    queryKey: commentReplyKeys.comment(commentId),
    queryFn: () => commentReplyApi.getCommentReplies(commentId),
    enabled: Boolean(commentId),
  });
}
