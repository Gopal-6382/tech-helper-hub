import {
  updateReviewSchema,
  reviewIdParamSchema,
} from "../validations/review.validation";
import { ReviewRepository } from "../repositories/review.repository";
import { BookingRepository } from "@/modules/bookings/repositories/booking.repository";
import { ReviewService } from "../services/review.service";

const reviewRepository = new ReviewRepository();
const bookingRepository = new BookingRepository();
const reviewService = new ReviewService(reviewRepository, bookingRepository);

export async function updateReviewAction(
  reviewId: string,
  authUserId: string,
  rawData: unknown,
) {
  const { reviewId: validatedReviewId } = reviewIdParamSchema.parse({
    reviewId,
  });
  const validatedData = updateReviewSchema.parse(rawData);

  return reviewService.updateReview(
    validatedReviewId,
    authUserId,
    validatedData,
  );
}
