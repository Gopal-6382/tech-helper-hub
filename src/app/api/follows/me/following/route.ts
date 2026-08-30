import { routeHandler } from "@/middleware/route.handler";
import { getFollowing } from "@/modules/follows/actions/get-following.action";
import { User } from "@/constant/roles.route.const";

export const GET = routeHandler(async (_req, user) => {
  return getFollowing(user.userId);
}, User);
