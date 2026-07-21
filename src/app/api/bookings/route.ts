import { authMiddleware } from "@/middleware/auth.middleware";

import { createBooking } from "@/modules/bookings/actions/create-booking.action";
import { getMyBookings } from "@/modules/bookings/actions/get-my-bookings.action";

export const POST = authMiddleware(createBooking);

export const GET = authMiddleware((req, user) => getMyBookings(user));
