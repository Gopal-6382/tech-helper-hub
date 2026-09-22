"use client";

import { useQuery } from "@tanstack/react-query";

import { postService } from "@/frontend/features/posts/api/posts-api";

export const postKeys = {
  all: ["posts"] as const,

  lists: () => [...postKeys.all, "list"] as const,

  list: () => [...postKeys.lists()] as const,

  details: () => [...postKeys.all, "detail"] as const,

  detail: (postId: string) => [...postKeys.details(), postId] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: postKeys.list(),
    queryFn: postService.getPosts,
  });
}
