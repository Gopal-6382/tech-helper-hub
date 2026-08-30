import { User } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { getSavedPosts } from "@/modules/saveposts/actions/get-saved-posts.action";

// GET /api/saved-posts
export const GET = routeHandler(async (_req, user) => {
  return getSavedPosts(user.userId);
}, User);
