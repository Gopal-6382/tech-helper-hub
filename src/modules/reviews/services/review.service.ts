import { ReviewRepository } from "../repositories/review.repository";
import { BookingRepository } from "@/modules/bookings/repositories/booking.repository";
import { CreateReviewDto, UpdateReviewDto } from "../types/review.types";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} from "@/utils/api-response";

export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private bookingRepository: BookingRepository
  ) {}

  /**
   * Creates a review for a completed booking.
   * Auto-resolves userId and professionalId from the booking record.
   */
  async createReview(authUserId: string, dto: CreateReviewDto) {
    // 1. Fetch booking with parent service request
    const booking = await this.bookingRepository.findById(dto.bookingId);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    // 2. Validate booking completion status
    if (booking.status !== "COMPLETED") {
      throw new BadRequestError("You can only review a completed job");
    }

    // 3. Authorization check: Only the customer who created the request can leave a review
    if (booking.userId !== authUserId) {
      throw new UnauthorizedError("You are not authorized to review this booking");
    }

    // 4. Duplicate Check: Ensure booking has not been reviewed already
    const existingReview = await this.reviewRepository.findByBookingId(dto.bookingId);
    if (existingReview) {
      throw new ConflictError("A review has already been submitted for this booking");
    }

    // 5. Construct full review payload using auto-derived IDs
    const reviewData = {
      ...dto,
      userId: authUserId,
      professionalId: booking.professionalId,
    };

    // 6. Save review to database
    return this.reviewRepository.create(reviewData);
  }

  /**
   * Fetches a single review by its ID.
   */
  async getReviewById(reviewId: string) {
    const review = await this.reviewRepository.findById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    return review;
  }

  /**
   * Updates an existing review written by the authenticated user
   */
  async updateReview(reviewId: string, authUserId: string, dto: UpdateReviewDto) {
    const review = await this.reviewRepository.findById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    if (review.userId !== authUserId) {
      throw new UnauthorizedError("You can only update your own reviews");
    }

    return this.reviewRepository.update(reviewId, dto);
  }

  /**
   * Deletes a review created by the authenticated user.
   */
  async deleteReview(reviewId: string, authUserId: string) {
    const review = await this.reviewRepository.findById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    if (review.userId !== authUserId) {
      throw new UnauthorizedError("You can only delete your own reviews");
    }

    return this.reviewRepository.delete(reviewId);
  }

  /**
   * Fetches all reviews submitted by a specific user with pagination.
   */
  async getUserReviews(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const reviews = await this.reviewRepository.findByUserId(userId, skip, limit);

    return {
      reviews,
      pagination: {
        page,
        limit,
      },
    };
  }

  /**
   * Fetches reviews for a professional profile along with calculated average ratings
   */
 async getProfessionalReviews(
  professionalId: string,
  page = 1,
  limit = 10,
  rating?: number
) {
  const skip = (page - 1) * limit;

  const [reviews, stats] = await Promise.all([
    this.reviewRepository.findByProfessionalId(professionalId, skip, limit, rating),
    this.reviewRepository.getProfessionalRatingStats(professionalId),
  ]);

  return {
    reviews,
    stats: {
      averageRating: stats._avg.rating ? Number(stats._avg.rating.toFixed(1)) : 0,
      totalReviews: stats._count.rating,
    },
    pagination: {
      page,
      limit,
    },
  };
}
}