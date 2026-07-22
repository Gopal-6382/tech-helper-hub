import { Review } from "@prisma/client";

/**
 * DTO received from client.
 * userId and professionalId come from Booking,
 * so client only sends bookingId, rating and comment.
 */
export interface CreateReviewDto {
  bookingId: string;
  rating: number;
  comment?: string;
}

/**
 * Data that will actually be stored in database.
 * Service fills these values after validating Booking.
 */
export interface CreateReviewData extends CreateReviewDto {
  userId: string;
  professionalId: string;
}

/**
 * Fields user is allowed to update.
 */
export interface UpdateReviewDto {
  rating?: number;
  comment?: string;
}

/**
 * Review response type.
 */
export type ReviewResponse = Review;

