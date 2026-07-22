import { authMiddleware } from "@/middleware/auth.middleware";

import { getProfessionalReviews } from "@/modules/reviews/actions/get-professional-reviews.action";

export const GET = authMiddleware(
  async (req, user, context) => {
    // Read professional id.
    const { professionalId } =
      await context.params;

    return getProfessionalReviews(
      professionalId,
    );
  },
);