import { authMiddleware } from "@/middleware/auth.middleware";

import { getFollowers } from "@/modules/follows/actions/get-followers.action";

export const GET = authMiddleware(getFollowers);
