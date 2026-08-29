import { z } from "zod";

/**
 * Reusable image URL validator
 */
const imageSchema = z.url("Each image must be a valid URL");

/**
 * Validation for creating a review.
 * Client sends bookingId, rating, optional comment, and optional images.
 */
export const createReviewSchema = z.object({
  // Fix: Zod requires z.string().uuid(), not z.uuid()
  bookingId: z.uuid("Invalid booking ID format"),

  rating: z
    .number("Rating is required")
    .int("Rating must be an integer")
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),

  comment: z
    .string()
    .trim()
    .max(500, "Comment cannot exceed 500 characters")
    .optional(),

  images: z
    .array(imageSchema)
    .max(5, "You can upload a maximum of 5 images")
    .optional()
    .default([]),
});

/**
 * Validation for updating an existing review.
 * Ensures at least one field is provided for update.
 */
export const updateReviewSchema = z
  .object({
    rating: z
      .number()
      .int("Rating must be an integer")
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5")
      .optional(),

    comment: z
      .string()
      .trim()
      .max(500, "Comment cannot exceed 500 characters")
      .optional(),

    images: z
      .array(imageSchema)
      .max(5, "You can upload a maximum of 5 images")
      .optional(),
  })
  .refine(
    (data) =>
      data.rating !== undefined ||
      data.comment !== undefined ||
      data.images !== undefined,
    {
      message:
        "At least one field (rating, comment, or images) must be provided to update",
    },
  );

/**
 * URL Param Validation Schemas
 */
export const reviewIdParamSchema = z.object({
  reviewId: z.uuid("Invalid review ID format"),
});


/**
 * Pagination & Filter Query Schema for fetching professional reviews
 */
export const getProfessionalReviewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  rating: z.coerce.number().int().min(1).max(5).optional(),
});
