import { routeHandler } from "@/middleware/route.handler";
import { getCategories } from "@/modules/professional/actions/get-categories.action";
import { updateCategories } from "@/modules/professional/actions/update-categories.action";
import { USER_ROLES, PROFESSIONAL_ROLES } from "@/constant/role.constant";
import { UpdateProfessionalCategoriesDto } from "@/modules/professional/types/professional.types";
import { updateProfessionalCategoriesSchema } from "@/modules/professional/validations/professional.validation";

// GET: Fetch categories
export const GET = routeHandler(
  async () => {
    return getCategories();
  },
  {
    roles: USER_ROLES,
  }
);

// PATCH: Update professional categories
export const PATCH = routeHandler(
  async (req, user) => {
    const body :UpdateProfessionalCategoriesDto= await req.json();
const data = updateProfessionalCategoriesSchema.parse(body);
    return updateCategories(user.userId, data);
  },
  {
    roles: PROFESSIONAL_ROLES,
  }
);