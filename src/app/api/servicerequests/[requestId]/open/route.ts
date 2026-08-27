import { routeHandler } from "@/middleware/route.handler";
import { getOpenRequestsAction } from "@/modules/servicerequest/actions/get-open-requests.action";

export type ServiceRequestRouteParams = {
  requestId: string;
};
export const GET = routeHandler<ServiceRequestRouteParams>(
  async (_req, _user, {params}) => {
    const { requestId } = await params;
    return getOpenRequestsAction(requestId);
  },
);
