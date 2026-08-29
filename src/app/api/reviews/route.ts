import { routeHandler } from "@/middleware/route.handler";
import { createReviewAction } from "@/modules/reviews/actions/create-review.action";
import { USER_ROLES } from "@/constant/role.constant";
import { createReviewSchema } from "@/modules/reviews/validations/review.validation";

// POST /api/reviews
export const POST = routeHandler(
  async (req, user) => {
    const body = await req.json();
    const validatedData = createReviewSchema.parse(body);

    return createReviewAction(user.userId, validatedData);
  },
  {
    roles: USER_ROLES,
  },
);
