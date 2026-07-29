import { prisma } from "@/lib/prisma";

import { CreateCommentDto, UpdateCommentDto } from "../types/comment.types";

export class CommentRepository {
  async create(data: CreateCommentDto & { authorId: string }) {
    return prisma.comment.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.comment.findUnique({
      where: { id },

      include: {
        author: true,
        replies: true,
      },
    });
  }

  async findByPostId(postId: string) {
    return prisma.comment.findMany({
      where: {
        postId,
      },

      include: {
        author: true,
        replies: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async update(id: string, data: UpdateCommentDto) {
    return prisma.comment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}
