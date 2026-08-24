import { routeHandler } from "@/middleware/route.handler";
import { unsavePost } from "@/modules/saveposts/actions/unsave-post.action";
import { USER_ROLES } from "@/constant/role.constant";

type SavedPostRouteParams = {
  postId: string;
};

// DELETE /api/saved-posts/[postId]
export const DELETE = routeHandler<SavedPostRouteParams>(
  async (_req, user, { params }) => {
    const { postId } = await params;

    if (!postId) {
      throw new Error("Post ID is required");
    }

    return unsavePost(user.userId, postId);
  },
  {
    roles: USER_ROLES,
  },
);
