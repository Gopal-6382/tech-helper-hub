import { authMiddleware } from "@/middleware/auth.middleware";

import { createReview } from "@/modules/reviews/actions/create-review.action";

export const POST = authMiddleware(createReview);