import { authMiddleware } from "@/middleware/auth.middleware";

import { getSavedPosts } from "@/modules/saveposts/actions/get-saved-posts.action";

export const GET = authMiddleware(getSavedPosts);
