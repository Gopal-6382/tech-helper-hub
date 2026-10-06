import { apiRequest } from "@/frontend/lib/api";
import type { Comment } from "../types/comment.types";

export const commentApi = {
  async getComments(postId: string): Promise<Comment[]> {
    const response = await apiRequest<{
      comments: Comment[];
      pagination: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
      };
    }>(`/api/comments/${postId}/getcomments`);

    return response.data?.comments ?? [];
  },

  async createComment(postId: string, content: string): Promise<Comment> {
    const response = await apiRequest<Comment>("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        postId,
        content,
      }),
    });

    if (!response.data) {
      throw new Error("Failed to create comment");
    }

    return response.data;
  },

  async updateComment(commentId: string, content: string): Promise<Comment> {
    const response = await apiRequest<Comment>(`/api/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({
        content,
      }),
    });

    if (!response.data) {
      throw new Error("Failed to update comment");
    }

    return response.data;
  },

  async deleteComment(commentId: string): Promise<void> {
    await apiRequest(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};