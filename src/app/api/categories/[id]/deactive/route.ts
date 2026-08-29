import { routeHandler } from "@/middleware/route.handler";
import { deactivateCategoryAction } from "@/admin/categories/actions/main.action";
import { USER_ROLES } from "@/constant/role.constant";

type RouteParams = { id: string };

// PATCH /api/categories/:id/deactivate
export const PATCH = routeHandler<RouteParams>(
  async (_req, _user, context) => {
    const { id } = await context.params;
    return deactivateCategoryAction(id);
  },
  { roles: USER_ROLES },
);
