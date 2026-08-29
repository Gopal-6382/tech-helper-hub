import { routeHandler } from "@/middleware/route.handler";
import { USER_ROLES } from "@/constant/role.constant";
import { activateMeAction } from "@/modules/users/actions/activateMeAction.action";

export const DELETE = routeHandler(
  async (_req, user) => {
    return activateMeAction(user.userId);
  },
  {
    roles: USER_ROLES,
    skipActiveCheck: true,
  },
);
