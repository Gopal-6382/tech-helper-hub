import { authMiddleware } from "@/middleware/auth.middleware";

import { deleteReview } from "@/modules/reviews/actions/delete-review.action";
import { getReview } from "@/modules/reviews/actions/get-review.action";
import { updateReview } from "@/modules/reviews/actions/update-review.action";

export const GET = authMiddleware(
  async (req, user, context) => {
    // Read review id from URL.
    const { id } = await context.params;

    return getReview(id);
  },
);

export const PATCH = authMiddleware(
  async (req, user, context) => {
    // Read review id from URL.
    const { id } = await context.params;

    return updateReview(req, user, id);
  },
);

export const DELETE = authMiddleware(
  async (req, user, context) => {
    // Read review id from URL.
    const { id } = await context.params;

    return deleteReview(user, id);
  },
);