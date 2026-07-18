import { authMiddleware } from "@/middleware/auth.middleware";

import { updateAvailability } from "@/modules/professional/actions/update-availability.action";

export const PATCH = authMiddleware(updateAvailability);
