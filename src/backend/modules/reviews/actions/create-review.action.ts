import { ReviewRepository } from "../repositories/review.repository";
import { BookingRepository } from "@/modules/bookings/repositories/booking.repository";
import { ReviewService } from "../services/review.service";
import { CreateReviewDto } from "../types/review.types";

const reviewRepository = new ReviewRepository();
const bookingRepository = new BookingRepository();
const reviewService = new ReviewService(reviewRepository, bookingRepository);

export async function createReviewAction(
  authUserId: string,
  Data: CreateReviewDto,
) {
  return reviewService.createReview(authUserId, Data);
}
