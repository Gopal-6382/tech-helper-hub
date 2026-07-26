import { authMiddleware } from "@/middleware/auth.middleware";

import { getBooking } from "@/modules/bookings/actions/get-booking.action";

// app/api/bookings/route.ts

export const GET = authMiddleware(async (req, user) => {
  const id = new URL(req.url).searchParams.get("id");

  if (!id) {
    throw new Error("Booking id is required");
  }

  return getBooking(id);
});
