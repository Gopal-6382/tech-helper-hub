import { authMiddleware } from "@/middleware/auth.middleware";

import { becomeProfessional } from "@/modules/professional/actions/become-professional.action";
import { getProfessional } from "@/modules/professional/actions/get-professional.action";
import { updateProfessional } from "@/modules/professional/actions/update-professional.action";

export const POST = authMiddleware(becomeProfessional);

export const GET = authMiddleware(getProfessional);

export const PATCH = authMiddleware(updateProfessional);
