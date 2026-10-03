import { routeHandler } from "@/middleware/route.handler";

import { recordPostView } from "@/backend/modules/views/actions/post-view.action";
import { User } from "@/constant/roles.route.const";

type PostViewRouteParams = {
  postId: string;
};

// POST /api/posts/[postId]/views
export const POST = routeHandler<PostViewRouteParams>(
  async (req, user, { params }) => {
    const { postId } = await params;

    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0] ?? null;

    return recordPostView({
      postId,
      userId: user.userId,
      ipAddress,
    });
  },
  User,
);
