import { prisma } from "@/lib/prisma";

import {
  CreateReviewData,
  UpdateReviewDto,
} from "../types/review.types";

export class ReviewRepository {
  /**
   * Get one review by its ID.
   */
  async findById(id: string) {
    return prisma.review.findUnique({
      where: {
        id,
      },

      // Include related data so frontend
      // gets everything in one request.
      include: {
        // User who wrote this review.
        user: true,

        // Professional who received this review.
        professional: {
          include: {
            // Professional's user account
            user: true,
          },
        },

        // Booking associated with this review.
        booking: {
          include: {
            // Show original service request.
            serviceRequest: {
              include: {
                // Category of that request.
                category: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Get review using booking.
   * Used to prevent duplicate reviews.
   */
  async findByBookingId(bookingId: string) {
    return prisma.review.findUnique({
      where: {
        bookingId,
      },
    });
  }

  /**
   * Get all reviews written by one user.
   */
  async findByUserId(userId: string) {
    return prisma.review.findMany({
      where: {
        userId,
      },

      include: {
        professional: {
          include: {
            user: true,
          },
        },

        booking: {
          include: {
            serviceRequest: true,
          },
        },
      },

      // Latest review first.
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Get reviews received by one professional.
   */
  async findByProfessionalId(
    professionalId: string,
  ) {
    return prisma.review.findMany({
      where: {
        professionalId,
      },

      include: {
        // Customer who gave review.
        user: true,

        booking: {
          include: {
            serviceRequest: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Create new review.
   */
  async create(data: CreateReviewData) {
    return prisma.review.create({
      data,
    });
  }

  /**
   * Update review.
   */
  async update(
    id: string,
    data: UpdateReviewDto,
  ) {
    return prisma.review.update({
      where: {
        id,
      },

      data,
    });
  }

  /**
   * Delete review.
   */
  async delete(id: string) {
    return prisma.review.delete({
      where: {
        id,
      },
    });
  }
}