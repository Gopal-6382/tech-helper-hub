import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function getFollowingCount(userId: string) {
  return followService.getFollowingCount(userId);
}