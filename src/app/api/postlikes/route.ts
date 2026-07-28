import { authMiddleware } from "@/middleware/auth.middleware";

import { likePost } from "@/modules/post-likes/actions/like-post.action";

export const POST = authMiddleware(likePost);