import { routeHandler } from "@/middleware/route.handler";
import { USER_ROLES } from "@/constant/role.constant";
import { createCategorySchema } from "@/admin/categories/validations/categories.validation";
import {
  createCategoryAction,
  getCategoriesAction,
} from "@/admin/categories/actions/main.action";

export const GET = routeHandler(
  async (req) => {
    const { searchParams } = new URL(req.url);
    // Parse the query parameter explicitly
    if (!searchParams.get("includeInactive")) {
      return getCategoriesAction(true);
    }
    const includeInactive = searchParams.get("includeInactive") === "true";

    // Call service directly (bypass Server Action)
    return getCategoriesAction(includeInactive);
  },
  { roles: USER_ROLES },
);

// POST /api/categories
export const POST = routeHandler(
  async (req) => {
    const body = await req.json();
    const parsed = createCategorySchema.parse(body);

    return createCategoryAction(parsed);
  },
  { roles: USER_ROLES },
);
