import { routeHandler } from "@/middleware/route.handler";
import { getUserReviews } from "@/modules/reviews/actions/get-user-reviews.action";
import { USER_ROLES } from "@/constant/role.constant";

// GET /api/reviews/user
export const GET = routeHandler(
  async (_req, user) => {
    return getUserReviews(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
