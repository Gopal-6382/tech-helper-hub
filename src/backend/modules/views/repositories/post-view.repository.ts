import { prisma } from "@/backend/lib/prisma";

import type { CreatePostViewDto } from "../types/post-view.types";

export const postViewRepository = {
  async findPostById(postId: string) {
    return prisma.problemPost.findUnique({
      where: { id: postId },
      select: {
        id: true,
        authorId: true,
      },
    });
  },

  async findViewByPostAndUser(postId: string, userId: string) {
    return prisma.postView.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
      select: {
        id: true,
      },
    });
  },

  async createViewAndIncrementCount(payload: CreatePostViewDto) {
    return prisma.$transaction([
      prisma.postView.create({
        data: {
          postId: payload.postId,
          userId: payload.userId,
          ipAddress: payload.ipAddress ?? null,
        },
      }),
      prisma.problemPost.update({
        where: { id: payload.postId },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      }),
    ]);
  },
};