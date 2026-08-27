import { routeHandler } from "@/middleware/route.handler"; 
import { createServiceRequestSchema } from "@/modules/servicerequest/validations/service-request.validation";
import { createRequestAction } from "@/modules/servicerequest/actions/create-request.action";
import { getMyRequestsAction } from "@/modules/servicerequest/actions/get-my-requests.action";
import { AppError } from "@/utils/api-response";

export const POST = routeHandler(async (req, user) => {
  const body = await req.json();

  const parsed = createServiceRequestSchema.safeParse(body);
  if (!parsed.success) {
    const errorMessage = parsed.error.issues.map((i) => i.message).join(", ");
    throw new AppError(`Invalid request payload: ${errorMessage}`, 400);
  }

  return createRequestAction(user.userId, parsed.data);
});

export const GET = routeHandler(async (_req, user) => {
  
  return getMyRequestsAction(user.userId);
});