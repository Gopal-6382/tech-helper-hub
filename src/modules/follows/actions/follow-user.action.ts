import { FollowService } from "../services/follow.service";
import { CreateFollowDto } from "../types/follow.types";
const followService = new FollowService();

export async function followUser(userId: string, body: CreateFollowDto) {
  const result = await followService.followUser(userId, body);

  return result;
}
