import { logoutAction } from "@/modules/auth/actions/logout.action";
import { routeHandler } from "@/middleware/route.handler";

export const POST = routeHandler(async (_req, user) => {
  return logoutAction(user.userId);
});
