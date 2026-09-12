import { ReviewRepository } from "../repositories/review.repository";
import { BookingRepository } from "@/modules/bookings/repositories/booking.repository";
import { ReviewService } from "../services/review.service";

const reviewRepository = new ReviewRepository();
const bookingRepository = new BookingRepository();
const reviewService = new ReviewService(reviewRepository, bookingRepository);

export async function getUserReviewsAction(
  userId: string,
  page = 1,
  limit = 10,
) {
  return reviewService.getUserReviews(userId, page, limit);
}
