import { routeHandler } from "@/middleware/route.handler";
import { getFollowingCount } from "@/modules/follows/actions/get-following-count.action";
import { User } from "@/constant/roles.route.const";

export const GET = routeHandler(async (_req, user) => {
  return getFollowingCount(user.userId);
}, User);
