"use client";

import { useQuery } from "@tanstack/react-query";

import { postApi } from "@/frontend/features/posts/api/posts-api";

import { postKeys } from "@/frontend/features/posts/hooks/use-posts";

export function usePost(postId: string) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postApi.getPost(postId),
    enabled: Boolean(postId),
  });
}
