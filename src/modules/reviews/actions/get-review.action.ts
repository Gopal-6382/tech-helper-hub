import { ReviewService } from "../services/review.service";

const reviewService = new ReviewService();

export async function getReview(id: string) {
  return reviewService.getReview(id);
}
