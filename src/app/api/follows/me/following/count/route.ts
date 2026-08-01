import { authMiddleware } from "@/middleware/auth.middleware";

import { getFollowingCount } from "@/modules/follows/actions/get-following-count.action";

export const GET = authMiddleware(getFollowingCount);