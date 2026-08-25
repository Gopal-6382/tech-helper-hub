import { routeHandler } from "@/middleware/route.handler";
import { getPostLikes } from "@/modules/post-likes/actions/get-post-likes.action";
import { unlikePost } from "@/modules/post-likes/actions/unlike-post.action";
import { USER_ROLES } from "@/constant/role.constant";
import { likePost } from "@/modules/post-likes/actions/like-post.action";

type PostLikeRouteParams = {
  postId: string;
};

// POST /api/post-likes/[postId]
export const POST = routeHandler<PostLikeRouteParams>(
  async (_req, user, { params }) => {
    const { postId } = await params;

    // Pass an object matching the Zod schema expectation

    return likePost({ postId: postId, userId: user.userId });
  },
  {
    roles: USER_ROLES,
  },
);

// GET /api/post-likes/[postId]
export const GET = routeHandler<PostLikeRouteParams>(
  async (_req, _user, { params }) => {
    const { postId } = await params;

    // Pass as CreatePostLikeDto object
    return getPostLikes({ postId });
  },
  {
    roles: USER_ROLES,
  },
);

// DELETE /api/post-likes/[postId]
export const DELETE = routeHandler<PostLikeRouteParams>(
  async (_req, user, { params }) => {
    const { postId } = await params;

    // Pass as CreatePostLikeData object
    return unlikePost({ postId, userId: user.userId });
  },
  {
    roles: USER_ROLES,
  },
);