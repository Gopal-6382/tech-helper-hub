import { authMiddleware } from "@/middleware/auth.middleware";

import { getBooking } from "@/modules/bookings/actions/get-booking.action";

export const GET = authMiddleware(async (req, user, context) => {
  const { id } = await context.params;

  return getBooking(id);
});
