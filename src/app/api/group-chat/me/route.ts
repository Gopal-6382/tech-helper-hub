import { routeHandler } from "@/middleware/route.handler";

import { getGroup } from "@/modules/groupchat/actions/get-my-groups.action";

export const GET = routeHandler(async (_req, user) => {
  return getGroup(user.userId);
});
