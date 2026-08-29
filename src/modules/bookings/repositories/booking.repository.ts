import { BookingStatus, RequestStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { CreateBookingData, UpdateBookingDto } from "../types/booking.types";

const USER_SELECT = {
  select: {
    id: true,

    name: true,

    avatar: true,
  },
} as const;

const PROFESSIONAL_INCLUDE = {
  include: {
    user: USER_SELECT,
  },
} as const;

const TARGET_PROFESSIONAL_SELECT = {
  select: {
    id: true,

    user: {
      select: {
        name: true,
      },
    },
  },
} as const;

export class BookingRepository {
  // FIND BY ID

  async findById(id: string) {
    return prisma.booking.findUnique({
      where: { id },

      include: {
        user: USER_SELECT,

        professional: PROFESSIONAL_INCLUDE,

        serviceRequest: {
          include: { category: true },
        },
      },
    });
  }

  // FIND USER BOOKINGS

  async findByUserId(userId: string) {
    return prisma.booking.findMany({
      where: { userId },

      include: {
        professional: PROFESSIONAL_INCLUDE,

        serviceRequest: true,
      },

      orderBy: { createdAt: "desc" },
    });
  }

  // FIND PROFESSIONAL BOOKINGS

  async findByProfessionalId(professionalId: string) {
    return prisma.booking.findMany({
      where: { professionalId },

      include: {
        user: USER_SELECT,

        serviceRequest: true,
      },

      orderBy: { createdAt: "desc" },
    });
  }

  // GET OFFERS FOR SERVICE REQUEST

  async findByServiceRequestId(serviceRequestId: string) {
    return prisma.booking.findMany({
      where: { serviceRequestId },

      include: {
        professional: PROFESSIONAL_INCLUDE,
      },

      orderBy: { createdAt: "desc" },
    });
  }

  // CREATE BOOKING (Step 4)

  async create(data: CreateBookingData) {
    return prisma.booking.create({
      data: {
        serviceRequestId: data.serviceRequestId,

        userId: data.userId,

        professionalId: data.professionalId,

        amount: data.amount,

        scheduledAt: data.scheduledAt,
      },
    });
  }

  // CHECK EXISTING OFFER

  async findExistingBooking(serviceRequestId: string, professionalId: string) {
    return prisma.booking.findFirst({
      where: {
        serviceRequestId,

        professionalId,
      },
    });
  }

  // UPDATE DETAILS

  async update(id: string, data: UpdateBookingDto) {
    return prisma.booking.update({
      where: { id },

      data,
    });
  }

  // UPDATE STATUS

  async updateStatus(id: string, status: BookingStatus) {
    return prisma.booking.update({
      where: { id },

      data: { status },
    });
  }

  // STEP 7: START BOOKING

  async startAtomic(bookingId: string, professionalId: string) {
    return prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
      });

      if (
        !booking ||
        booking.professionalId !== professionalId ||
        booking.status !== BookingStatus.ACCEPTED
      ) {
        return null;
      }

      const request = await tx.serviceRequest.findUnique({
        where: { id: booking.serviceRequestId },
      });

      if (!request || request.status !== RequestStatus.ACCEPTED) {
        return null;
      }

      const startedBooking = await tx.booking.update({
        where: { id: bookingId },

        data: {
          status: BookingStatus.STARTED,

          startedAt: new Date(),
        },
      });

      await tx.serviceRequest.update({
        where: { id: booking.serviceRequestId },

        data: { status: RequestStatus.IN_PROGRESS },
      });

      return startedBooking;
    });
  }

  // STEP 8: COMPLETE BOOKING

  async completeAtomic(bookingId: string, professionalId: string) {
    return prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
      });

      if (
        !booking ||
        booking.professionalId !== professionalId ||
        booking.status !== BookingStatus.STARTED
      ) {
        return null;
      }

      const request = await tx.serviceRequest.findUnique({
        where: { id: booking.serviceRequestId },
      });

      if (!request || request.status !== RequestStatus.IN_PROGRESS) {
        return null;
      }

      const completedBooking = await tx.booking.update({
        where: { id: bookingId },

        data: {
          status: BookingStatus.COMPLETED,

          completedAt: new Date(),
        },
      });

      await tx.serviceRequest.update({
        where: { id: booking.serviceRequestId },

        data: { status: RequestStatus.COMPLETED },
      });

      return completedBooking;
    });
  }

  // STEP 9: CANCEL OPEN REQUEST AND PENDING OFFERS

  async cancelOpenRequestAtomic(
    bookingId: string,

    professionalId: string,

    cancelReason: string,
  ) {
    return prisma.$transaction(async (tx) => {
      // 1. Fetch the target booking and its associated ServiceRequest

      const booking = await tx.booking.findUnique({
        where: { id: bookingId },

        include: { serviceRequest: true },
      });

      // 2. Validate booking existence, professional authorization, and state

      // Replace `providerId` with your Prisma schema's field for the professional

      if (
        !booking ||
        booking.professionalId !== professionalId ||
        booking.status !== BookingStatus.STARTED
      ) {
        return null;
      }

      // 3. Update the targeted booking status to CANCELLED

      const cancelledBooking = await tx.booking.update({
        where: { id: bookingId },

        data: {
          status: BookingStatus.CANCELLED,

          cancelReason:
            cancelReason || "Booking was cancelled by the professional",
        },
      });

      // 4. Revert parent ServiceRequest back to OPEN for other professionals,

      // or set to CANCELLED depending on business requirements

      await tx.serviceRequest.update({
        where: { id: booking.serviceRequestId },

        data: { status: RequestStatus.OPEN },
      });

      return cancelledBooking;
    });
  }

  // FIND OPEN REQUESTS FOR PROFESSIONAL

  async findOpenRequests(userId: string) {
    if (!userId) {
      throw new Error("userId is required for findOpenRequests query");
    }

    return prisma.serviceRequest.findMany({
      where: {
        status: RequestStatus.OPEN,

        OR: [
          { targetProfessionalId: null },

          { targetProfessional: { userId } },
        ],
      },

      orderBy: { createdAt: "desc" },

      include: {
        category: true,

        requester: USER_SELECT,

        targetProfessional: TARGET_PROFESSIONAL_SELECT,
      },
    });
  }
}
