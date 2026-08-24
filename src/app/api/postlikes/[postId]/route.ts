import { routeHandler } from "@/middleware/route.handler";
import { getPostLikes } from "@/modules/post-likes/actions/get-post-likes.action";
import { unlikePost } from "@/modules/post-likes/actions/unlike-post.action";
import { USER_ROLES } from "@/constant/role.constant";

type PostLikeRouteParams = {
  postId: string;
};

// GET /api/post-likes/:postId
export const GET = routeHandler<PostLikeRouteParams>(
  async (_req, _user, { params }) => {
    const { postId } = await params;

    if (!postId) {
      throw new Error("postId is required");
    }

    return getPostLikes(postId);
  },
  {
    roles: USER_ROLES,
  },
);

// DELETE /api/post-likes/:postId
export const DELETE = routeHandler<PostLikeRouteParams>(
  async (_req, user, { params }) => {
    const { postId } = await params;

    if (!postId) {
      throw new Error("postId is required");
    }

    return unlikePost(postId, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
