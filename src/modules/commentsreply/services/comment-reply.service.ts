import {
  CreateCommentReplyData,
  UpdateCommentReplyData,
} from "../types/comment-reply.types";

import { CommentReplyRepository } from "../repositories/comment-reply.repository";

export class CommentReplyService {
  private commentReplyRepository = new CommentReplyRepository();

  // Create reply
  async createReply(data: CreateCommentReplyData) {
    return this.commentReplyRepository.create(data);
  }

  // Get replies
  async getReplies(commentId: string) {
    return this.commentReplyRepository.findByComment(commentId);
  }

  // Get single reply
  async getReply(id: string) {
    const reply = await this.commentReplyRepository.findById(id);

    if (!reply) {
      throw new Error("Reply not found");
    }

    return reply;
  }

  // Update reply (only author)
  async updateReply(
    id: string,
    authorId: string,
    data: UpdateCommentReplyData,
  ) {
    const reply = await this.commentReplyRepository.findById(id);

    if (!reply) {
      throw new Error("Reply not found");
    }

    if (reply.authorId !== authorId) {
      throw new Error("You can only update your own reply");
    }

    return this.commentReplyRepository.update(id, data);
  }

  // Delete reply (only author)
  async deleteReply(id: string, authorId: string) {
    const reply = await this.commentReplyRepository.findById(id);

    if (!reply) {
      throw new Error("Reply not found");
    }

    if (reply.authorId !== authorId) {
      throw new Error("You can only delete your own reply");
    }

    return this.commentReplyRepository.delete(id);
  }
}
