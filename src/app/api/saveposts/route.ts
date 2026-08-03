import { authMiddleware } from "@/middleware/auth.middleware";
import { savePost } from "@/modules/saveposts/actions/save-post.action";
export const POST = authMiddleware(savePost);
