import { routeHandler } from "@/middleware/route.handler";
import { getFollowingCount } from "@/modules/follows/actions/get-following-count.action";
import { USER_ROLES } from "@/constant/role.constant";

export const GET = routeHandler(
  async (_req, user) => {
    return getFollowingCount(user.userId);
  },
  {
    roles: USER_ROLES,
  }
);