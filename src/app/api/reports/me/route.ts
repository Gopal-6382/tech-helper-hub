import { routeHandler } from "@/middleware/route.handler";
import { getMyReports } from "@/modules/postreport/actions/get-my-reports.action";
import { USER_ROLES } from "@/constant/role.constant";

// GET /api/postreport/my
export const GET = routeHandler(
  async (_req, user) => {
    return getMyReports(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
