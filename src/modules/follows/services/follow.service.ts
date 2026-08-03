import { CreateFollowDto } from "../types/follow.types";
import { FollowRepository } from "../repositories/follow.repository";

export class FollowService {
  private followRepository = new FollowRepository();

  async followUser(followerId: string, data: CreateFollowDto) {
    if (followerId === data.followingId) {
      throw new Error("You cannot follow yourself");
    }

    const user = await this.followRepository.userExists(data.followingId);

    if (!user) {
      throw new Error("User not found");
    }

    const existing = await this.followRepository.findFollow(
      followerId,
      data.followingId,
    );

    if (existing) {
      throw new Error("Already following this user");
    }

    return this.followRepository.create({
      followerId,
      followingId: data.followingId,
    });
  }

  async unfollowUser(followerId: string, followingId: string) {
    const existing = await this.followRepository.findFollow(
      followerId,
      followingId,
    );

    if (!existing) {
      throw new Error("Follow relationship not found");
    }

    return this.followRepository.delete(followerId, followingId);
  }

  async getFollowers(userId: string) {
    return this.followRepository.findFollowers(userId);
  }

  async getFollowing(userId: string) {
    return this.followRepository.findFollowing(userId);
  }

  async getFollowersCount(userId: string) {
    return this.followRepository.followersCount(userId);
  }

  async getFollowingCount(userId: string) {
    return this.followRepository.followingCount(userId);
  }
}
