import { ReviewService } from "../services/review.service";
import { CreateReviewDto } from "../types/review.types";

const reviewService = new ReviewService();

export async function createReview(userId: string, data: CreateReviewDto) {
  return reviewService.createReview(userId, data);
}
