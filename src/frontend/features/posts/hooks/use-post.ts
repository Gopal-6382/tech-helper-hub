"use client";

import { useQuery } from "@tanstack/react-query";

import { postService } from "@/frontend/features/posts/api/posts-api";

import { postKeys } from "@/frontend/features/posts/hooks/use-posts";

export function usePost(postId: string) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postService.getPost(postId),
    enabled: Boolean(postId),
  });
}
