import { logoutAction } from "@/modules/auth/actions/logout.action";
import { routeHandler } from "@/middleware/route.handler";

export const POST = routeHandler(async (req, user) => {
  return logoutAction(user.userId);
});
