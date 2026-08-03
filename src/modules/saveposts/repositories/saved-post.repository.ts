import { prisma } from "@/lib/prisma";

import { CreateSavedPostData } from "../types/saved-post.types";

export class SavedPostRepository {
  async findByUserAndPost(userId: string, postId: string) {
    return prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }

  async create(data: CreateSavedPostData) {
    return prisma.savedPost.create({
      data,
    });
  }

  async delete(userId: string, postId: string) {
    return prisma.savedPost.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }

  async findByUser(userId: string) {
    return prisma.savedPost.findMany({
      where: {
        userId,
      },
      include: {
        post: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            category: true,
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
