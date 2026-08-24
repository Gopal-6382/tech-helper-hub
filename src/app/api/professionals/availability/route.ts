import { routeHandler } from "@/middleware/route.handler";
import { updateAvailability } from "@/modules/professional/actions/update-availability";
import { PROFESSIONAL_ROLES } from "@/constant/role.constant";
import { Updateprofessional } from "@/modules/professional/types/professional.types";

export const PATCH = routeHandler(
  async (req, user) => {
    const body: Updateprofessional = await req.json();
    return updateAvailability(user.userId, body.isAvailable);
  },
  {
    roles: PROFESSIONAL_ROLES,
  },
);
