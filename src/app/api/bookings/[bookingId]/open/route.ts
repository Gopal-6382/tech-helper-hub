import { Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { getOpenRequestsAction } from "@/modules/bookings/actions/get-open-requests.action";
import { getProfessionalIdByUserId } from "@/utils/booking-helper";

export const GET = routeHandler(async (_req, user) => {
  const professionalId =await getProfessionalIdByUserId(user.userId);
  return getOpenRequestsAction(professionalId);
}, Professional);
