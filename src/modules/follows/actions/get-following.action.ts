import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function getFollowing(userId: string) {
  return followService.getFollowing(userId);
}