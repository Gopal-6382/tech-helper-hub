import { getProfessionalReviewsQuerySchema } from "../validations/review.validation";
import { ReviewRepository } from "../repositories/review.repository";
import { BookingRepository } from "@/modules/bookings/repositories/booking.repository";
import { ReviewService } from "../services/review.service";
import { GetProfessionalReviewsQuery } from "../types/review.types";

const reviewRepository = new ReviewRepository();
const bookingRepository = new BookingRepository();
const reviewService = new ReviewService(reviewRepository, bookingRepository);

export async function getProfessionalReviewsAction(
  professionalId: string,
  queryParams?: GetProfessionalReviewsQuery
) {
  const validatedQuery = getProfessionalReviewsQuerySchema.parse(queryParams || {});

  return reviewService.getProfessionalReviews(
    professionalId,
    validatedQuery.page,
    validatedQuery.limit,
    validatedQuery.rating
  );
}