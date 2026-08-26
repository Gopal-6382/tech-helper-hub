import { routeHandler } from "@/middleware/route.handler";
import { USER_ROLES } from "@/constant/role.constant";
import { updateCategorySchema } from "@/admin/categories/validations/categories.validation";
import {
  updateCategoryAction,
  deleteCategoryAction,
} from "@/admin/categories/actions/main.action";

type CategoryParams = { id: string };

// PATCH /api/categories/[id]
export const PATCH = routeHandler<CategoryParams>(
  async (req, _user, context) => {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = updateCategorySchema.parse(body);

    return updateCategoryAction(id, parsed);
  },
  { roles: USER_ROLES }
);

// DELETE /api/categories/[id]
export const DELETE = routeHandler<CategoryParams>(
  async (_req, _user, context) => {
    const { id } = await context.params;

    return deleteCategoryAction(id);
  },
  { roles: USER_ROLES }
);