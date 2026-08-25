import { routeHandler } from "@/middleware/route.handler";
import { updateAvailability } from "@/modules/professional/actions/update-availability";
import { PROFESSIONAL_ROLES } from "@/constant/role.constant";
import { Updateprofessional } from "@/modules/professional/types/professional.types";
import { updateAvailabilitySchema } from "@/modules/professional/validations/professional.validation";

export const PATCH = routeHandler(
  async (req, user) => {
    const body: Updateprofessional = await req.json();
    const data = updateAvailabilitySchema.parse(body);
    return updateAvailability(user.userId, data.isAvailable);
  },
  {
    roles: PROFESSIONAL_ROLES,
  },
);
