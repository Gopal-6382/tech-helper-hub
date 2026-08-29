import { routeHandler } from "@/middleware/route.handler";
import { getUserReviewsAction } from "@/modules/reviews/actions/get-user-reviews.action";
import { USER_ROLES } from "@/constant/role.constant";

// GET /api/reviews/user
export const GET = routeHandler(
  async (req, user) => {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    return getUserReviewsAction(user.userId, page, limit);
  },
  {
    roles: USER_ROLES,
  },
);
