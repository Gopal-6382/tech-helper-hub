import { prisma } from "@/lib/prisma";
import { CreatePostLikeData } from "../types/post-like.types";

export class PostLikeRepository {
  // Direct insert using database unique constraint
  async create(data: CreatePostLikeData) {
    return prisma.postLike.create({
      data,
    });
  }

  // Direct delete by composite key
  async delete(postId: string, userId: string) {
    return prisma.postLike.delete({
      where: {
        postId_userId: { postId, userId },
      },
    });
  }

  // Find single record to check if user liked
  async findLike(postId: string, userId: string) {
    return prisma.postLike.findUnique({
      where: {
        postId_userId: { postId, userId },
      },
      select: {
        postId: true,
        userId: true,
      },
    });
  }

  // Get all likes for a post with public user details
  async findByPost(postId: string) {
    return prisma.postLike.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });
  }
}
