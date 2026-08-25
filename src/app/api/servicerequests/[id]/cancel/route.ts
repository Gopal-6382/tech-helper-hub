import { cancelRequest } from "@/modules/servicerequest/actions/cancel-request.action";
import { routeHandler } from "@/middleware/route.handler";
export type RequestParams = {
  params: {
    id: string;
  };
};
export const PATCH = routeHandler(async (_req, user, { params }) => {
  const { id } = await params;

  return cancelRequest(user.userId, id);
});
