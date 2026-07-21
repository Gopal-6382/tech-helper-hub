import { authMiddleware } from "@/middleware/auth.middleware";

import { cancelBooking } from "@/modules/bookings/actions/cancel-booking.action";

export const PATCH = authMiddleware(async (req, user, context) => {
  const { id } = await context.params;

  return cancelBooking(id);
});
