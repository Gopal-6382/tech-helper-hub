import { authMiddleware } from "@/middleware/auth.middleware";

import { getFollowing } from "@/modules/follows/actions/get-following.action";

export const GET = authMiddleware(getFollowing);
