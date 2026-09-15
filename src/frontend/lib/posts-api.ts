// src/frontend/lib/posts-api.ts

import { apiRequest } from "@/frontend/lib/api";
import type { Post } from "@/features/posts/types/post";
import type {
  CreatePostData,
  UpdatePostDto,
} from "@/modules/posts/types/post.types";

export async function getPosts(): Promise<Post[]> {
  const response = await apiRequest<Post[]>("/api/posts");

  return response.data ?? [];
}

export async function getPost(
  postId: string,
): Promise<Post> {
  const response = await apiRequest<Post>(
    `/api/posts/${postId}`,
  );

  if (!response.data) {
    throw new Error("Post not found");
  }

  return response.data;
}

export async function createPost(
  data: CreatePostData,
): Promise<Post> {
  const response = await apiRequest<Post>("/api/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.data) {
    throw new Error("Failed to create post");
  }

  return response.data;
}

export async function updatePost(
  postId: string,
  data: UpdatePostDto,
): Promise<Post> {
  const response = await apiRequest<Post>(
    `/api/posts/${postId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );

  if (!response.data) {
    throw new Error("Failed to update post");
  }

  return response.data;
}

export async function deletePost(
  postId: string,
): Promise<void> {
  await apiRequest(`/api/posts/${postId}`, {
    method: "DELETE",
  });
}