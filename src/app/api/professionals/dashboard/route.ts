import { routeHandler } from "@/middleware/route.handler";
import { getDashboard } from "@/modules/professional/actions/get-dashboard.action";
import { PROFESSIONAL_ROLES } from "@/constant/role.constant";

export const GET = routeHandler(
  async (_req, user) => {
    return getDashboard(user.userId);
  },
  {
    roles: PROFESSIONAL_ROLES,
  },
);
