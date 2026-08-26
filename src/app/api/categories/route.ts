import { routeHandler } from "@/middleware/route.handler";
import { USER_ROLES } from "@/constant/role.constant";
import { createCategorySchema } from "@/admin/categories/validations/categories.validation";
import {
  createCategoryAction,
  getCategoriesAction,
} from "@/admin/categories/actions/main.action";

// GET /api/categories
export const GET = routeHandler(
  async (req) => {
    const { searchParams } = new URL(req.url);

    // Explicit string comparison
    const includeInactive = searchParams.get("includeInactive") === "true";

    return getCategoriesAction(includeInactive);
  },
  { roles: USER_ROLES }
);

// POST /api/categories
export const POST = routeHandler(
  async (req) => {
    const body = await req.json();
    const parsed = createCategorySchema.parse(body);

    return createCategoryAction(parsed);
  },
  { roles: USER_ROLES }
);