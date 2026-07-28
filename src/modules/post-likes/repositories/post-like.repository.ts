import { prisma } from "@/lib/prisma";

import {
  CreatePostLikeData,
} from "../types/post-like.types";

export class PostLikeRepository {
  // Check whether user already liked
  async findLike(
    postId: string,
    userId: string,
  ) {
    return prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  }

  // Like post
  async create(
    data: CreatePostLikeData,
  ) {
    return prisma.postLike.create({
      data,
    });
  }

  // Unlike post
  async delete(
    postId: string,
    userId: string,
  ) {
    return prisma.postLike.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  }

  // Get all likes of a post
  async findByPost(
    postId: string,
  ) {
    return prisma.postLike.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  // Count likes
  async count(
    postId: string,
  ) {
    return prisma.postLike.count({
      where: {
        postId,
      },
    });
  }
}