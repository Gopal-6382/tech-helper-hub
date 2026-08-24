import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function unfollowUser(userId: string, followingId: string) {
  const result = await followService.unfollowUser(userId, followingId);

  return result;
}
