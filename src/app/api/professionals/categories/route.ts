import { routeHandler } from "@/middleware/route.handler";
import { updateCategories } from "@/modules/professional/actions/update-categories.action";
import {  PROFESSIONAL_ROLES } from "@/constant/role.constant";
import { UpdateProfessionalCategoriesDto } from "@/modules/professional/types/professional.types";
import { updateProfessionalCategoriesSchema } from "@/modules/professional/validations/professional.validation";


// PATCH: Update professional categories
export const PATCH = routeHandler(
  async (req, user) => {
    const body: UpdateProfessionalCategoriesDto = await req.json();
    const data = updateProfessionalCategoriesSchema.parse(body);
    return updateCategories(user.userId, data);
  },
  {
    roles: PROFESSIONAL_ROLES,
  },
);
