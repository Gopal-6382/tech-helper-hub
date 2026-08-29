import { Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { getProfessionalBookingsAction } from "@/modules/bookings/actions/get-professional-bookings.action";
import { getProfessionalIdByUserId } from "@/utils/booking-helper";

export const GET = routeHandler(async (_req, user) => {
  const professionalId = await getProfessionalIdByUserId(user.userId);

  return getProfessionalBookingsAction(professionalId);
}, Professional);
