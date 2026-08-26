import { routeHandler } from "@/middleware/route.handler"; // Adjust import path to your routeHandler file
import { CategoryService } from "@/admin/categories/services/categories.service";
import { createCategorySchema } from "@/admin/categories/validations/categories.validation";
import { USER_ROLES } from "@/constant/role.constant";

const categoryService = new CategoryService();

// GET /api/categories (Public or authenticated)
export const GET = routeHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const includeInactive = searchParams.get("includeInactive") === "true";

  return categoryService.getCategories(includeInactive);
},
  {  roles:USER_ROLES,}
);

// POST /api/categories (Admin only)
export const POST = routeHandler(
  async (req) => {
    const body = await req.json();
    const parsed = createCategorySchema.parse(body);

    return categoryService.createCategory(parsed);
  },
  {  roles:USER_ROLES,}

);