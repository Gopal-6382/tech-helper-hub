import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export async function getFollowers(userId: string) {
  return followService.getFollowers(userId);
}