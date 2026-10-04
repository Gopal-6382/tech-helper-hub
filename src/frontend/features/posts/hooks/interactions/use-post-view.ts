"use client";

import { useMutation } from "@tanstack/react-query";

import { postViewApi } from "@/frontend/features/posts/api/post-view.api";

export type PostViewResponse = {
  success: boolean;
  message: string;
  counted?: boolean;
  alreadyViewed?: boolean;
  isAuthor?: boolean;
  viewCount: number;
};

type ApiResponse = {
  success: boolean;
  data: PostViewResponse;
};

export function usePostView() {
  return useMutation({
    mutationFn: async (postId: string): Promise<PostViewResponse> => {
      const response = (await postViewApi.viewPost(postId)) as ApiResponse;

      return response.data;
    },
  });
}