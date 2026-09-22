import { routeHandler } from "@/middleware/route.handler";

import { USER_ROLES } from "@/constant/role.constant";
import { updatePostStatus } from "@/modules/posts/actions/update-post-status.action";
import { UpdatePostStatusInput } from "@/backend/modules/posts/validations/post.validation";

type PostRouteParams = {
  id: string;
};

export const PATCH = routeHandler<PostRouteParams>(
  async (req, user, { params }) => {
    const { id } = await params;

    const body:UpdatePostStatusInput = await req.json();

    console.log("STATUS BODY:", body);



    return updatePostStatus(
      id,
      user.userId,
      { status: body.status },
    );
  },
  {
    roles: USER_ROLES,
  },
);