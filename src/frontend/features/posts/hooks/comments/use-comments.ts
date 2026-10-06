import { useQuery } from "@tanstack/react-query";

import { commentApi } from "@/features/posts/api/comment.api";

export const commentKeys = {
  all: ["comments"] as const,
  post: (postId: string) => ["comments", postId] as const,
};

export function useComments(postId: string) {
  return useQuery({
    queryKey: commentKeys.post(postId),
    queryFn: () => commentApi.getComments(postId),
    enabled: Boolean(postId),
  });
}
