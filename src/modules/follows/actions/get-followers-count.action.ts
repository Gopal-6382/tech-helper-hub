import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function getFollowersCount(userId: string) {
  const result = await followService.getFollowersCount(userId);

  return result;
}