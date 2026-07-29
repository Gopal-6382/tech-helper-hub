import { prisma } from "@/lib/prisma";

import {
  CreateCommentReplyData,
  UpdateCommentReplyData,
} from "../types/comment-reply.types";

export class CommentReplyRepository {
  // Create
  async create(data: CreateCommentReplyData) {
    return prisma.commentReply.create({
      data,
    });
  }

  // Get all replies of a comment
  async findByComment(commentId: string) {
    return prisma.commentReply.findMany({
      where: {
        commentId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  // Get reply by id
  async findById(id: string) {
    return prisma.commentReply.findUnique({
      where: {
        id,
      },
    });
  }

  // Update
  async update(id: string, data: UpdateCommentReplyData) {
    return prisma.commentReply.update({
      where: {
        id,
      },
      data,
    });
  }

  // Delete
  async delete(id: string) {
    return prisma.commentReply.delete({
      where: {
        id,
      },
    });
  }
}
