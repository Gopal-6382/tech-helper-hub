import { BookingStatus } from "@prisma/client";

import { BookingRepository } from "@/modules/bookings/repositories/booking.repository";

import { ReviewRepository } from "../repositories/review.repository";
import {
  CreateReviewDto,
  UpdateReviewDto,
} from "../types/review.types";

export class ReviewService {
  private reviewRepository = new ReviewRepository();

  // We need booking repository because
  // review depends on booking information.
  private bookingRepository = new BookingRepository();

  /**
   * Create Review
   */
  async createReview(
    userId: string,
    data: CreateReviewDto,
  ) {
    // -------------------------------------------------
    // STEP 1
    // Check whether booking exists.
    // -------------------------------------------------
    const booking =
      await this.bookingRepository.findById(
        data.bookingId,
      );

    if (!booking) {
      throw new Error("Booking not found");
    }

    // -------------------------------------------------
    // STEP 2
    // Only booking owner can review.
    // -------------------------------------------------
    if (booking.userId !== userId) {
      throw new Error(
        "You cannot review this booking",
      );
    }

    // -------------------------------------------------
    // STEP 3
    // Booking must be completed.
    // -------------------------------------------------
    if (
      booking.status !==
      BookingStatus.COMPLETED
    ) {
      throw new Error(
        "Complete booking before review",
      );
    }

    // -------------------------------------------------
    // STEP 4
    // Prevent duplicate review.
    // One Booking = One Review.
    // -------------------------------------------------
    const existingReview =
      await this.reviewRepository.findByBookingId(
        data.bookingId,
      );

    if (existingReview) {
      throw new Error(
        "Review already exists",
      );
    }

    // -------------------------------------------------
    // STEP 5
    // Save review.
    //
    // userId comes from JWT.
    // professionalId comes from Booking.
    // Client never sends these values.
    // -------------------------------------------------
    return this.reviewRepository.create({
      ...data,

      userId,

      professionalId:
        booking.professionalId,
    });
  }

  /**
   * Get Single Review
   */
  async getReview(id: string) {
    const review =
      await this.reviewRepository.findById(id);

    if (!review) {
      throw new Error("Review not found");
    }

    return review;
  }

  /**
   * Reviews written by current user.
   */
  async getUserReviews(userId: string) {
    return this.reviewRepository.findByUserId(
      userId,
    );
  }

  /**
   * Reviews received by professional.
   */
  async getProfessionalReviews(
    professionalId: string,
  ) {
    return this.reviewRepository.findByProfessionalId(
      professionalId,
    );
  }

  /**
   * Update Review
   */
  async updateReview(
    reviewId: string,
    userId: string,
    data: UpdateReviewDto,
  ) {
    const review =
      await this.getReview(reviewId);

    // Only review owner can edit.
    if (review.userId !== userId) {
      throw new Error(
        "Unauthorized",
      );
    }

    return this.reviewRepository.update(
      reviewId,
      data,
    );
  }

  /**
   * Delete Review
   */
  async deleteReview(
    reviewId: string,
    userId: string,
  ) {
    const review =
      await this.getReview(reviewId);

    // Only review owner can delete.
    if (review.userId !== userId) {
      throw new Error(
        "Unauthorized",
      );
    }

    return this.reviewRepository.delete(
      reviewId,
    );
  }
}