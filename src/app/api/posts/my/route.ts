import { routeHandler } from "@/middleware/route.handler";

import { USER_ROLES } from "@/constant/role.constant";
import { getMyPosts } from "@/modules/posts/actions/get-my-posts.action";

export const GET = routeHandler(
  async (_req, user) => {
    return getMyPosts(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
