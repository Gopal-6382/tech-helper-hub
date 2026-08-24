import { routeHandler } from "@/middleware/route.handler";
import { getFollowers } from "@/modules/follows/actions/get-followers.action";
import { USER_ROLES } from "@/constant/role.constant";

export const GET = routeHandler(
  async (_req, user) => {
    return getFollowers(user.userId);
  },
  {
    roles: USER_ROLES,
  }
);