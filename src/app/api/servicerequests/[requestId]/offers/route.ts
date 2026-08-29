import { User } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { offerRequestsAction } from "@/modules/servicerequest/actions/offer-requests.action";

type BookingRouteParams = {
  requestId: string;
};

export const GET = routeHandler<BookingRouteParams>(
  async (_req, user, { params }) => {
    const { requestId } = await params;
    console.log(requestId);
    return offerRequestsAction(requestId, user.userId);
  },
  User,
);
