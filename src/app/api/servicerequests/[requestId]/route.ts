import { routeHandler } from "@/middleware/route.handler";
import { updateServiceRequestSchema } from "@/modules/servicerequest/validations/service-request.validation";
import { getRequestAction } from "@/modules/servicerequest/actions/get-request.action";
import { updateRequestAction } from "@/modules/servicerequest/actions/update-request.action";
import { cancelRequestAction } from "@/modules/servicerequest/actions/cancel-request.action";
import { AppError } from "@/utils/api-response";

export type ServiceRequestRouteParams = {
  requestId: string;
};
export const GET = routeHandler<ServiceRequestRouteParams>(
  async (_req, _user, {params}) => {
    const { requestId } = await params;
    return getRequestAction(requestId);
  },
);

export const PATCH = routeHandler<ServiceRequestRouteParams>(
  async (req, user,{params}) => {
    const { requestId } = await params;
    const body = await req.json();

    const parsed = updateServiceRequestSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessage = parsed.error.issues.map((i:{message:string}) => i.message).join(", ");
      throw new AppError(`Invalid update payload: ${errorMessage}`, 400);
    }

    return updateRequestAction(user.userId, requestId, parsed.data);
  },
);

export const DELETE = routeHandler<ServiceRequestRouteParams>(
  async (_req, user, {params}) => {
    const { requestId } = await params;
    return cancelRequestAction(user.userId, requestId);
  },
);
