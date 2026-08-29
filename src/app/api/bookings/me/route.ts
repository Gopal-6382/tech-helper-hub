import { Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { getMyBookingsAction } from "@/modules/bookings/actions/get-my-bookings.action";

export const GET = routeHandler(async (_req, user) => {
  return getMyBookingsAction(user.userId);
}, Professional);
