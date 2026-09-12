import { reviewIdParamSchema } from "../validations/review.validation";
import { ReviewRepository } from "../repositories/review.repository";
import { BookingRepository } from "@/modules/bookings/repositories/booking.repository";
import { ReviewService } from "../services/review.service";

const reviewRepository = new ReviewRepository();
const bookingRepository = new BookingRepository();
const reviewService = new ReviewService(reviewRepository, bookingRepository);

export async function getReviewAction(reviewId: string) {
  const { reviewId: validatedReviewId } = reviewIdParamSchema.parse({
    reviewId,
  });

  return reviewService.getReviewById(validatedReviewId);
}
