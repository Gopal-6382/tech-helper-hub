import { ReviewService } from "../services/review.service";

const reviewService = new ReviewService();

export async function getUserReviews(userId: string) {
  return reviewService.getUserReviews(userId);
}
