import { routeHandler } from "@/middleware/route.handler";
import { createBooking } from "@/modules/bookings/actions/create-booking.action";
import { createBookingSchema, updateBookingSchema } from "@/modules/bookings/validations/booking.validation";
import { getMyBookings } from "@/modules/bookings/actions/get-my-bookings.action";
import { USER_ROLES } from "@/constant/role.constant";
import { updatebooking } from "@/modules/bookings/actions/update-booking.action";

export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();

    const data = createBookingSchema.parse(body);

    return createBooking(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
export const PATCH = routeHandler(
  async (req, user) => {
    const body = await req.json();

    const data = updateBookingSchema.parse(body);

    return updatebooking(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

export const GET = routeHandler(
  async (_req, user) => {
    return getMyBookings(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
