import { User } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { acceptBookingAction } from "@/modules/servicerequest/actions/accept-booking.action";

type BookingRouteParams = {
  requestId: string;
};

export const PATCH = routeHandler<BookingRouteParams>(
  async (_req, user, { params }) => {
    const { requestId } = await params;

    return acceptBookingAction(requestId, user.userId);
  },
  User,
);
