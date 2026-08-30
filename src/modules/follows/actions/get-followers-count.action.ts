import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function getFollowersCount(userId: string) {
  return await followService.getFollowersCount(userId);
}
