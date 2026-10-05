import { routeHandler } from "@/middleware/route.handler";

import { USER_ROLES } from "@/constant/role.constant";
import { updatePostStatus } from "@/modules/posts/actions/update-post-status.action";
import {
  UpdatePostStatusInput,
  updatePostStatusSchema,
} from "@/backend/modules/posts/validations/post.validation";

type PostRouteParams = {
  id: string;
};

export const PATCH = routeHandler<PostRouteParams>(
  async (req, user, { params }) => {
    const { id } = await params;

    const body = await req.json();

    const data: UpdatePostStatusInput = updatePostStatusSchema.parse(body);

    return updatePostStatus(id, user.userId, { status: data.status });
  },
  {
    roles: USER_ROLES,
  },
);
