import { prisma } from "@/lib/prisma";
import { CreateFollowData } from "../validations/follow.validation";

export class FollowRepository {
  // Check if already following
  async findFollow(followerId: string, followingId: string) {
    if (!followerId || !followingId) return null;

    return prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  // Check target user exists
  async userExists(userId: string) {
    if (!userId) return null;

    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
  }

  // Follow user
  async create(data: CreateFollowData) {
    return prisma.follow.create({
      data,
    });
  }

  // Unfollow user
  async delete(followerId: string, followingId: string) {
    if (!followerId || !followingId) return null;

    return prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  // Followers list
  async findFollowers(userId: string) {
    if (!userId) return [];

    return prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Following list
  async findFollowing(userId: string) {
    if (!userId) return [];

    return prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Followers count
  async followersCount(userId: string) {
    if (!userId) return 0;

    return prisma.follow.count({
      where: {
        followingId: userId,
      },
    });
  }

  // Following count
  async followingCount(userId: string) {
    if (!userId) return 0;

    return prisma.follow.count({
      where: {
        followerId: userId,
      },
    });
  }
}