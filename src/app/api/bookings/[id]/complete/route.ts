import { authMiddleware } from "@/middleware/auth.middleware";

import { completeBooking } from "@/modules/bookings/actions/complete-booking.action";

export const PATCH = authMiddleware(
  async (req, user, context) => {
    const { id } = await context.params;

    return completeBooking(id);
  },
);