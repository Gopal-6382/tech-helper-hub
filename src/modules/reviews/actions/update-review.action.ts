import { ReviewService } from "../services/review.service";
import { UpdateReviewDto } from "../types/review.types";

const reviewService = new ReviewService();

export async function updateReview(
  reviewId: string,
  userId: string,
  data: UpdateReviewDto,
) {
  return reviewService.updateReview(reviewId, userId, data);
}
