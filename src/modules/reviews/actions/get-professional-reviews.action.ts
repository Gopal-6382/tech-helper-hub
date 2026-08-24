import { ReviewService } from "../services/review.service";

const reviewService = new ReviewService();

export async function getProfessionalReviews(professionalId: string) {
  return reviewService.getProfessionalReviews(professionalId);
}
