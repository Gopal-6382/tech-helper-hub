import { prisma } from "@/lib/prisma";

import { CreateFollowData } from "../types/follow.types";

export class FollowRepository {
  // Check if already following
  async findFollow(
    followerId: string,
    followingId: string,
  ) {
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
  async delete(
    followerId: string,
    followingId: string,
  ) {
    return prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  // Followers
  async findFollowers(userId: string) {
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

  // Following
  async findFollowing(userId: string) {
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
    return prisma.follow.count({
      where: {
        followingId: userId,
      },
    });
  }

  // Following count
  async followingCount(userId: string) {
    return prisma.follow.count({
      where: {
        followerId: userId,
      },
    });
  }
}