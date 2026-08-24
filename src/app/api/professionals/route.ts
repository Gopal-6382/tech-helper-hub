import { routeHandler } from "@/middleware/route.handler";
import { becomeProfessional } from "@/modules/professional/actions/become-professional.action";
import { getProfessional } from "@/modules/professional/actions/get-professional.action";
import { updateProfessional } from "@/modules/professional/actions/update-professional.action";
import { USER_ROLES, PROFESSIONAL_ROLES } from "@/constant/role.constant";
import {
  becomeProfessionalSchema,
  updateProfessionalSchema,
} from "@/modules/professional/validations/professional.validation";
import {
  BecomeProfessionalDto,
  UpdateProfessionalDto,
} from "@/modules/professional/types/professional.types";

// POST: Create a professional profile (Available to any logged-in user)
export const POST = routeHandler(
  async (req, user) => {
    const body: BecomeProfessionalDto = await req.json();
    const data = becomeProfessionalSchema.parse(body);
    return becomeProfessional(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

// GET: Fetch the current user's professional profile
export const GET = routeHandler(
  async (_req, user) => {
    return getProfessional(user.userId);
  },
  {
    roles: PROFESSIONAL_ROLES,
  },
);

// PATCH: Update professional profile details
export const PATCH = routeHandler(
  async (req, user) => {
    const body: UpdateProfessionalDto = await req.json();
    const data = updateProfessionalSchema.parse(body);

    return updateProfessional(user.userId, data);
  },
  {
    roles: PROFESSIONAL_ROLES,
  },
);
