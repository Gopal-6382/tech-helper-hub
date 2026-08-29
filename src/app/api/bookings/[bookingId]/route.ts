import { User_Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { getBookingAction } from "@/modules/bookings/actions/get-booking.action";

type BookingRouteParams = {
  bookingId: string;
};

export const GET = routeHandler<BookingRouteParams>(
  async (_req, _user, { params }) => {
    const { bookingId } = await params;
    return getBookingAction(bookingId);
  },
  User_Professional,
);
