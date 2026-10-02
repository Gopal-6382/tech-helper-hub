import { apiRequest } from "@/frontend/lib/api";

import type { Post } from "../types/post.types";
import type {
  CreatePostInput,
  UpdatePostInput,
} from "@/modules/posts/validations/post.validation";

export const postApi = {
  async getPosts(): Promise<Post[]> {
    const response = await apiRequest<Post[]>("/api/posts");
    return response.data ?? [];
  },

  async getPost(postId: string): Promise<Post> {
    const response = await apiRequest<Post>(`/api/posts/${postId}`);

    if (!response.data) {
      throw new Error("Post not found");
    }

    return response.data;
  },

  async createPost(data: CreatePostInput): Promise<Post> {
    const response = await apiRequest<Post>("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.data) {
      throw new Error("Failed to create post");
    }

    return response.data;
  },

  async updatePost(postId: string, data: UpdatePostInput): Promise<Post> {
    const response = await apiRequest<Post>(`/api/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (!response.data) {
      throw new Error("Failed to update post");
    }

    return response.data;
  },

  async deletePost(postId: string): Promise<void> {
    await apiRequest(`/api/posts/${postId}`, {
      method: "DELETE",
    });
  },
};