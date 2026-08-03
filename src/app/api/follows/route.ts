import { authMiddleware } from "@/middleware/auth.middleware";

import { followUser } from "@/modules/follows/actions/follow-user.action";

export const POST = authMiddleware(followUser);
