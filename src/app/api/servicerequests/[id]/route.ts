import { USER_ROLES } from "@/constant/role.constant";
import { routeHandler } from "@/middleware/route.handler";

import { getRequest } from "@/modules/servicerequest/actions/get-request.action";
import { updateRequest } from "@/modules/servicerequest/actions/update-request.action";
import { updateServiceRequestSchema } from "@/modules/servicerequest/validations/service-request.validation";
export type RequestParams = {
  id: string;
};
export const GET = routeHandler<RequestParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    return getRequest(id);
  },
  {
    roles: USER_ROLES,
  },
);

export const PATCH = routeHandler<RequestParams>(
  async (req, user, { params }) => {
    const { id } = await params;
    const body = await req.json();
    const data = updateServiceRequestSchema.parse(body);
    return updateRequest(user.userId, id, data);
  },
  {
    roles: USER_ROLES,
  },
);
