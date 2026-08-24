import { routeHandler } from "@/middleware/route.handler";
import { getFollowersCount } from "@/modules/follows/actions/get-followers-count.action";
import { USER_ROLES } from "@/constant/role.constant";

export const GET = routeHandler(
  async (_req, user) => {
    return getFollowersCount(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
