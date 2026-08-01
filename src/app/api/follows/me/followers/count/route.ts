import { authMiddleware } from "@/middleware/auth.middleware";

import { getFollowersCount } from "@/modules/follows/actions/get-followers-count.action";

export const GET = authMiddleware(getFollowersCount);