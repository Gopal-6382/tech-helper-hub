import { User } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { getFollowersCount } from "@/modules/follows/actions/get-followers-count.action";

export const GET = routeHandler(async (_req, user) => {
  return getFollowersCount(user.userId);
}, User);
