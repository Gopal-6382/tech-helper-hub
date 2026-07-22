import { authMiddleware } from "@/middleware/auth.middleware";

import { getUserReviews } from "@/modules/reviews/actions/get-user-reviews.action";

export const GET = authMiddleware(getUserReviews);