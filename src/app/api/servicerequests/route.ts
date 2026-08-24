import { USER_ROLES } from "@/constant/role.constant";
import { routeHandler } from "@/middleware/route.handler";

import { createRequest } from "@/modules/servicerequest/actions/create-request.action";
import { getMyRequests } from "@/modules/servicerequest/actions/get-my-requests.action";
import { createServiceRequestSchema } from "@/modules/servicerequest/validations/service-request.validation";

export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const data = createServiceRequestSchema.parse(body);
    return createRequest(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

export const GET = routeHandler(
  async (_req, user) => {
    return getMyRequests(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
