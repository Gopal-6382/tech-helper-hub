import { routeHandler } from "@/middleware/route.handler";
import { createReview } from "@/modules/reviews/actions/create-review.action";
import { createReviewSchema } from "@/modules/reviews/validations/review.validation";
import { USER_ROLES } from "@/constant/role.constant";

// POST /api/reviews
export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const data = createReviewSchema.parse(body);

    return createReview(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
