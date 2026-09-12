import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function unfollowUser(userId: string, followingId: string) {
  return await followService.unfollowUser(userId, followingId);
}
