import { prisma } from "@/lib/prisma";
import { CreateReviewData, UpdateReviewDto } from "../types/review.types";

const SAFE_USER_SELECT = {
  select: {
    id: true,
    name: true,
    avatar: true,
  },
};

export class ReviewRepository {
  /**
   * Find a single review by ID with full details
   */
  async findById(id: string) {
    if (!id) return null;

    return prisma.review.findUnique({
      where: { id },
      include: {
        user: SAFE_USER_SELECT,
        professional: {
          include: {
            user: SAFE_USER_SELECT,
          },
        },
        booking: {
          include: {
            serviceRequest: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Find existing review for a booking to prevent duplicates
   */
  async findByBookingId(bookingId: string) {
    if (!bookingId) return null;

    return prisma.review.findUnique({
      where: { bookingId },
    });
  }

  /**
   * Get paginated reviews given by a user
   */
  async findByUserId(userId: string, skip = 0, take = 10) {
    if (!userId) return [];

    return prisma.review.findMany({
      where: { userId },
      skip,
      take,
      include: {
        professional: {
          include: {
            user: SAFE_USER_SELECT,
          },
        },
        booking: {
          select: {
            id: true,
            scheduledAt: true,
            serviceRequest: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Get paginated reviews received by a professional
   */
 async findByProfessionalId(
  professionalId: string,
  skip = 0,
  take = 10,
  rating?: number
) {
  if (!professionalId) return [];

  return prisma.review.findMany({
    where: {
      professionalId,
      ...(rating ? { rating } : {}),
    },
    skip,
    take,
    include: {
      user: SAFE_USER_SELECT,
      booking: {
        select: {
          id: true,
          serviceRequest: {
            select: {
              title: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async getProfessionalRatingStats(professionalId: string) {
  return prisma.review.aggregate({
    where: { professionalId },
    _avg: { rating: true },
    _count: { rating: true },
  });
}

  /**
   * Create a review record
   */
  async create(data: CreateReviewData) {
    return prisma.review.create({
      data,
      include: {
        user: SAFE_USER_SELECT,
      },
    });
  }

  /**
   * Update review content or rating
   */
  async update(id: string, data: UpdateReviewDto) {
    return prisma.review.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete review
   */
  async delete(id: string) {
    return prisma.review.delete({
      where: { id },
    });
  }
}