// app/api/bookings/route.ts
import { PROFESSIONAL_ROLES } from "@/constant/role.constant";
import { routeHandler } from "@/middleware/route.handler";
import { getBooking } from "@/modules/bookings/actions/get-booking.action";

type BookingParams = {
  id: string;
};

export const PATCH = routeHandler<BookingParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Booking id is required");
    }

    return getBooking(id);
  },
  {
    roles: PROFESSIONAL_ROLES,
  },
);
