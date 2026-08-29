import { routeHandler } from "@/middleware/route.handler";
import { getReviewAction } from "@/modules/reviews/actions/get-review.action";
import { updateReviewAction } from "@/modules/reviews/actions/update-review.action";
import { deleteReviewAction } from "@/modules/reviews/actions/delete-review.action";
import { USER_ROLES } from "@/constant/role.constant";

type RouteParams = {
  id: string;
};

// GET /api/reviews/[id]
export const GET = routeHandler<RouteParams>(
  async (_req, _user, { params }) => {
    const { id } = await params;
    return getReviewAction(id);
  }
);

// PATCH /api/reviews/[id]
export const PATCH = routeHandler<RouteParams>(
  async (req, user, { params }) => {
    const { id } = await params;
    const body = await req.json();
    return updateReviewAction(id, user.userId, body);
  },
  {
    roles: USER_ROLES,
  }
);

// DELETE /api/reviews/[id]
export const DELETE = routeHandler<RouteParams>(
  async (_req, user, { params }) => {
    const { id } = await params;
    return deleteReviewAction(id, user.userId);
  },
  {
    roles: USER_ROLES,
  }
);