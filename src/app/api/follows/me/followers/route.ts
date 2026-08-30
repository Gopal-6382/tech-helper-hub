import { routeHandler } from "@/middleware/route.handler";
import { getFollowers } from "@/modules/follows/actions/get-followers.action";
import { User } from "@/constant/roles.route.const";

export const GET = routeHandler(async (_req, user) => {
  return getFollowers(user.userId);
}, User);
