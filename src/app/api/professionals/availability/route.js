import { authMiddleware } from "@/middleware/auth.middleware";
import { updateAvailabilityAction } from "@/modules/professional/actions/update-availability";

export const PATCH = authMiddleware(updateAvailabilityAction);
