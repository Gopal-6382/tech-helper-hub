import { Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { createBookingAction } from "@/modules/bookings/actions/create-booking.action";
import {
  CreateBookingDto,
  createBookingSchema,
} from "@/modules/bookings/validations/booking.validation";

export const POST = routeHandler(async (req, user) => {
  const body = (await req.json()) as CreateBookingDto;
  const data = createBookingSchema.parse(body);
  return createBookingAction(user.userId, data);
}, Professional);
