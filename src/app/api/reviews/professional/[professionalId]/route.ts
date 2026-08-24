import { routeHandler } from "@/middleware/route.handler";
import { getProfessionalReviews } from "@/modules/reviews/actions/get-professional-reviews.action";
import { USER_ROLES } from "@/constant/role.constant";

type ProfessionalReviewsRouteParams = {
  professionalId: string;
};

// GET /api/reviews/professional/[professionalId]
export const GET = routeHandler<ProfessionalReviewsRouteParams>(
  async (_req, _user, { params }) => {
    const { professionalId } = await params;

    if (!professionalId) {
      throw new Error("Professional ID is required");
    }

    return getProfessionalReviews(professionalId);
  },
  {
    roles: USER_ROLES,
  },
);
