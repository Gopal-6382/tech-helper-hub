import { routeHandler } from "@/middleware/route.handler"; // Adjust import path to your routeHandler file
import { CategoryService } from "@/admin/categories/services/categories.service";
import { updateCategorySchema } from "@/admin/categories/validations/categories.validation";
import { USER_ROLES } from "@/constant/role.constant";

const categoryService = new CategoryService();

type CategoryParams = { id: string };

// PUT /api/categories/[id] (Admin only)
export const PATCH = routeHandler<CategoryParams>(
  async (req, _user, context) => {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = updateCategorySchema.parse(body);

    return categoryService.updateCategory(id, parsed);
  },
  {  roles:USER_ROLES,}
);

// DELETE /api/categories/[id] (Admin only)
export const DELETE = routeHandler<CategoryParams>(
  async (_req, _user, context) => {
    const { id } = await context.params;

    await categoryService.deleteCategory(id);
    return { message: "Category deleted successfully" };
  },
  {  roles:USER_ROLES,}

);