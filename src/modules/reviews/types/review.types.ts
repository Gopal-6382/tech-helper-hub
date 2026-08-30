import { z } from "zod";
import {
  createReviewSchema,
  updateReviewSchema,
  getProfessionalReviewsQuerySchema,
} from "../validations/review.validation";

/* DTO received from client (Inferred directly from Zod to prevent duplicate code) */
export type CreateReviewDto = z.infer<typeof createReviewSchema>;

/* DTO for updating a review */
export type UpdateReviewDto = z.infer<typeof updateReviewSchema>;

/* Query parameters for filtering professional reviews */
export type GetProfessionalReviewsQuery = z.infer<
  typeof getProfessionalReviewsQuerySchema
>;

/* Data stored in DB after Service attaches userId and professionalId from Booking */
export interface CreateReviewData extends CreateReviewDto {
  userId: string;
  professionalId: string;
}

