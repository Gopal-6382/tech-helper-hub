import { USER_AND_PROFESSIONAL_ROLES } from "@/constant/role.constant";
import { routeHandler } from "@/middleware/route.handler";
import { cancelBooking } from "@/modules/bookings/actions/cancel-booking.action";

type BookingParams = {
  id: string;
};

export const PATCH = routeHandler<BookingParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Booking id is required");
    }

    return cancelBooking(id);
  },
  {
    roles: USER_AND_PROFESSIONAL_ROLES,
  },
);
