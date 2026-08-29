import { Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { startBookingAction } from "@/modules/bookings/actions/start-booking.action";
import { getProfessionalIdByUserId } from "@/utils/booking-helper";

type BookingRouteParams = {
  bookingId: string;
};

export const PATCH = routeHandler<BookingRouteParams>(
  async (_req, user, { params }) => {
    const { bookingId } = await params;

    const professionalId = await getProfessionalIdByUserId(user.userId);

    return startBookingAction(bookingId, professionalId);
  },
  Professional,
);
