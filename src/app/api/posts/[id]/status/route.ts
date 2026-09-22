import { routeHandler } from "@/middleware/route.handler";

import { USER_ROLES } from "@/constant/role.constant";
import { updatePostStatus } from "@/modules/posts/actions/update-post-status.action";

type PostRouteParams = {
  id: string;
};

export const PATCH = routeHandler<PostRouteParams>(
  async (req, user, { params }) => {
    const { id } = await params;

    const body = await req.json();

    return updatePostStatus(
      id,
      user.userId,
      body.status,
    );
  },
  {
    roles: USER_ROLES,
  },
);