import { routeHandler } from "@/middleware/route.handler";
import { User } from "@/constant/roles.route.const";

import { recordPostView } from "@/backend/modules/views/actions/post-view.action";

type PostViewRouteParams = {
  postId: string;
};

// POST /api/posts/[postId]/views
export const POST = routeHandler<PostViewRouteParams>(
  async (_req, user, { params }) => {
    const { postId } = await params;

    return recordPostView({
      postId,
      userId: user.userId,
    });
  },
  User,
);
