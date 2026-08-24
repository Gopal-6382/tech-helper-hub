import { routeHandler } from "@/middleware/route.handler";
import { getSavedPosts } from "@/modules/saveposts/actions/get-saved-posts.action";
import { savePost } from "@/modules/saveposts/actions/save-post.action";
import { createSavedPostSchema } from "@/modules/saveposts/validations/saved-post.validation";
import { USER_ROLES } from "@/constant/role.constant";

// GET /api/saved-posts
export const GET = routeHandler(
  async (_req, user) => {
    return getSavedPosts(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);

// POST /api/saved-posts
export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const data = createSavedPostSchema.parse(body);

    return savePost(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
