import { authMiddleware } from "@/middleware/auth.middleware";

import { acceptBooking } from "@/modules/bookings/actions/accept-booking.action";

export const PATCH = authMiddleware(
  async (req, user, context) => {
    const { id } = await context.params;

    return acceptBooking(id);
  },
);