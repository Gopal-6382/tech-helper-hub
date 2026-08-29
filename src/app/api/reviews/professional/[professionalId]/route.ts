import { Professional } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { getProfessionalReviewsAction } from "@/modules/reviews/actions/get-professional-reviews.action";
import { GetProfessionalReviewsQuery } from "@/modules/reviews/types/review.types";

type RouteParams = {
  professionalId: string;
};

// GET /api/reviews/professional/[professionalId]
export const GET = routeHandler<RouteParams>(async (req, _user, { params }) => {
  const { professionalId } = await params;
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const rating = searchParams.get("rating");

  const queryParams: GetProfessionalReviewsQuery = {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    rating: rating ? Number(rating) : undefined,
  };

  return getProfessionalReviewsAction(professionalId, queryParams);
}, Professional);
