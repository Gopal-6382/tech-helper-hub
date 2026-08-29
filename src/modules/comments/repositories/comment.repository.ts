import { prisma } from "@/lib/prisma";
import { CreateCommentDto, UpdateCommentDto } from "../types/comment.types";

const SAFE_USER_SELECT = {
  id: true,
  name: true,
  avatar: true,
};

export class CommentRepository {
  async create(data: CreateCommentDto & { authorId: string }) {
    return prisma.comment.create({
      data,
      include: {
        author: {
          select: SAFE_USER_SELECT,
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: SAFE_USER_SELECT,
        },
        replies: {
          include: {
            author: {
              select: SAFE_USER_SELECT,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }

  async findByPostId(postId: string, skip = 0, take = 10) {
    return prisma.comment.findMany({
      where: {
        postId,
      },
      skip,
      take,
      include: {
        author: {
          select: SAFE_USER_SELECT,
        },
        _count: {
          select: { replies: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async countByPostId(postId: string) {
    return prisma.comment.count({
      where: {
        postId,
      },
    });
  }

  async update(id: string, data: UpdateCommentDto) {
    return prisma.comment.update({
      where: { id },
      data,
      include: {
        author: {
          select: SAFE_USER_SELECT,
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}
