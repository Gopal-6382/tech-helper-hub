import { Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { cancelOpenRequestAction } from "@/modules/bookings/actions/cancel-booking.action";
import { getProfessionalIdByUserId } from "@/utils/booking-helper";

type BookingRouteParams = {
  bookingId: string;
};

export const PATCH = routeHandler<BookingRouteParams>(
  async (req, user, { params }) => {
    const { bookingId } = await params;
    type Body = {
      cancelReason: string;
    };
    const body: Body = await req.json();
    const professionalId = await getProfessionalIdByUserId(user.userId);
    const cancelReason = body.cancelReason;
    return cancelOpenRequestAction(bookingId, professionalId, cancelReason);
  },
  Professional,
);
