import { routeHandler } from "@/middleware/route.handler";
import { unsavePost } from "@/modules/saveposts/actions/unsave-post.action";
import { savePost } from "@/modules/saveposts/actions/save-post.action";
import { createSavedPostSchema } from "@/modules/saveposts/validations/saved-post.validation";
import { User } from "@/constant/roles.route.const";

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
  User,
);

// POST /api/saved-posts
export const POST = routeHandler<SavedPostRouteParams>(
  async (_req, user, { params }) => {
    const body = await params;
    const data = createSavedPostSchema.parse(body);

    return savePost(user.userId, data);
  },
  User,
);
