import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "@/features/posts/api/comment.api";
import { commentKeys } from "./use-comments";
import { CreateCommentDto } from "@/backend/modules/comments/types/comment.types";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: CreateCommentDto) =>
      commentApi.createComment(postId, content),

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
