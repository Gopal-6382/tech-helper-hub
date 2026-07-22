import { z } from "zod";

/**
 * Validation for creating a review.
 * Client sends bookingId, rating and optional comment.
 */
export const createReviewSchema = z.object({
  // Booking that this review belongs to.
  bookingId: z.uuid(),

  // Rating must be between 1 and 5.
  rating: z
    .number()
    .int()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),

  // Optional review message.
  comment: z
    .string()
    .trim()
    .max(500, "Comment is too long")
    .optional(),
});

/**
 * Validation for updating review.
 * User can update only rating and comment.
 */
export const updateReviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional(),

  comment: z
    .string()
    .trim()
    .max(500)
    .optional(),
});