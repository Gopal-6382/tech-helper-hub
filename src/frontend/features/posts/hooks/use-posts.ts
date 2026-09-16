// src/frontend/hooks/posts/use-posts.ts

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "@/frontend/lib/posts-api";

import type {
  CreatePostData,
  UpdatePostDto,
} from "@/modules/posts/types/post.types";

export const postKeys = {
  all: ["posts"] as const,

  list: () => [...postKeys.all, "list"] as const,

  detail: (postId: string) => [...postKeys.all, "detail", postId] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: postKeys.list(),
    queryFn: getPosts,

    staleTime: 30_000,
    gcTime: 5 * 60_000,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}

export function usePost(postId: string) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),

    enabled: Boolean(postId),

    staleTime: 30_000,
    retry: 1,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostData) => createPost(data),

    onSuccess: (post) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });

      queryClient.setQueryData(postKeys.detail(post.id), post);
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: UpdatePostDto }) =>
      updatePost(postId, data),

    onSuccess: (post) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });

      queryClient.setQueryData(postKeys.detail(post.id), post);
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: (_, postId) => {
      queryClient.removeQueries({
        queryKey: postKeys.detail(postId),
      });

      queryClient.invalidateQueries({
        queryKey: postKeys.list(),
      });
    },
  });
}
