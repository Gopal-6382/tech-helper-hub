import { apiRequest } from "@/frontend/lib/api";

import type { CommentReply } from "../types/comment-reply.types";

export const commentReplyApi = {
  async getCommentReplies(commentId: string): Promise<CommentReply[]> {
    const response = await apiRequest<CommentReply[]>(
      `/api/comment-replies?commentId=${commentId}`
    );

    return response.data ?? [];
  },

  async createCommentReply(
    commentId: string,
    content: string
  ): Promise<CommentReply> {
    const response = await apiRequest<CommentReply>(
      "/api/comment-replies",
      {
        method: "POST",
        body: JSON.stringify({
          commentId,
          content,
        }),
      }
    );

    if (!response.data) {
      throw new Error("Failed to create reply");
    }

    return response.data;
  },

  async updateCommentReply(
    replyId: string,
    content: string
  ): Promise<CommentReply> {
    const response = await apiRequest<CommentReply>(
      `/api/comment-replies/${replyId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          content,
        }),
      }
    );

    if (!response.data) {
      throw new Error("Failed to update reply");
    }

    return response.data;
  },

  async deleteCommentReply(replyId: string): Promise<void> {
    await apiRequest(`/api/comment-replies/${replyId}`, {
      method: "DELETE",
    });
  },
};