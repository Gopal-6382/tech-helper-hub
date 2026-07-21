import { authMiddleware } from "@/middleware/auth.middleware";

import { rejectBooking } from "@/modules/bookings/actions/reject-booking.action";

export const PATCH = authMiddleware(async (req, user, context) => {
  const { id } = await context.params;

  return rejectBooking(id);
});
