import { Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { completeBookingAction } from "@/modules/bookings/actions/complete-booking.action";
import { getProfessionalIdByUserId } from "@/utils/booking-helper";

type BookingRouteParams = {
  bookingId: string;
};

export const PATCH = routeHandler<BookingRouteParams>(
  async (_req, user, { params }) => {
    const { bookingId } = await params;

    const professionalId = await getProfessionalIdByUserId(user.userId);

    return completeBookingAction(bookingId, professionalId);
  },
  Professional,
);
