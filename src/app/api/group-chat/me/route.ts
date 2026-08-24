import { routeHandler } from "@/middleware/route.handler";

import { getGroup } from "@/modules/groupchat/actions/get-my-groups.action";

export const GET = routeHandler(async (req, user) => {
  return getGroup(user.userId);
});
