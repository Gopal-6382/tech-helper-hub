import { ReviewService } from "../services/review.service";

const reviewService = new ReviewService();

export async function deleteReview(reviewId: string, userId: string) {
  return reviewService.deleteReview(reviewId, userId);
}
