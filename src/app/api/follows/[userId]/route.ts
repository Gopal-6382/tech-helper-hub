import { routeHandler } from "@/middleware/route.handler";
import { unfollowUser } from "@/modules/follows/actions/unfollow-user.action";
import { followUser } from "@/modules/follows/actions/follow-user.action";
import {
  CreateFollowDto,
  createFollowSchema,
} from "@/modules/follows/validations/follow.validation";
import { User } from "@/constant/roles.route.const";

type Params = {
  userId: string;
};

export const DELETE = routeHandler<Params>(async (_req, user, { params }) => {
  const { userId } = await params;

  if (!userId) {
    throw new Error("userId is required");
  }

  return unfollowUser(user.userId, userId);
}, User);
// app/api/.../route.ts
export const POST = routeHandler<Params>(async (_req, user, { params }) => {
  const { userId } = await params;
  if (!userId) {
    throw new Error("userId is required");
  }

  // Pass an object matching { followingId: userId } to Zod
  const data: CreateFollowDto = createFollowSchema.parse({
    followingId: userId,
  });

  // Pass follower ID as 1st argument, and validated payload as 2nd argument
  return followUser(user.userId, data);
}, User);
