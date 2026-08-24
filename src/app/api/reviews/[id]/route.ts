import { routeHandler } from "@/middleware/route.handler";
import { deleteReview } from "@/modules/reviews/actions/delete-review.action";
import { getReview } from "@/modules/reviews/actions/get-review.action";
import { updateReview } from "@/modules/reviews/actions/update-review.action";
import { updateReviewSchema } from "@/modules/reviews/validations/review.validation";
import { USER_ROLES } from "@/constant/role.constant";

type ReviewRouteParams = {
  id: string;
};

// GET /api/reviews/[id]
export const GET = routeHandler<ReviewRouteParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Review ID is required");
    }

    return getReview(id);
  },
  {
    roles: USER_ROLES,
  },
);

// PATCH /api/reviews/[id]
export const PATCH = routeHandler<ReviewRouteParams>(
  async (req, user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Review ID is required");
    }

    const body = await req.json();
    const data = updateReviewSchema.parse(body);

    return updateReview(id, user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

// DELETE /api/reviews/[id]
export const DELETE = routeHandler<ReviewRouteParams>(
  async (_req, user, { params }) => {
    const { id } = await params;

    if (!id) {
      throw new Error("Review ID is required");
    }

    return deleteReview(id, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
