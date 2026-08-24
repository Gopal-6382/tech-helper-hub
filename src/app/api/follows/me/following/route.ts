import { routeHandler } from "@/middleware/route.handler";
import { getFollowing } from "@/modules/follows/actions/get-following.action";
import { USER_ROLES } from "@/constant/role.constant";

export const GET = routeHandler(
  async (_req, user) => {
    return getFollowing(user.userId);
  },
  {
    roles: USER_ROLES,
  }
);