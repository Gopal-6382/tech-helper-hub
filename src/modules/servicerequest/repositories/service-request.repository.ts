import { prisma } from "@/lib/prisma";

import { RequestStatus, BookingStatus } from "@prisma/client";

import {
  CreateServiceRequestDto,
  UpdateServiceRequestDto,
} from "../validations/service-request.validation";

// Reusable selection primitives

const REQUESTER_SELECT = {
  select: {
    id: true,

    name: true,

    avatar: true,
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

export class ServiceRequestRepository {
  // CREATE

  async create(userId: string, data: CreateServiceRequestDto) {
    return prisma.serviceRequest.create({
      data: {
        ...data,

        requesterId: userId,

        status: RequestStatus.OPEN,
      },

      include: {
        category: true,

        targetProfessional: TARGET_PROFESSIONAL_SELECT,
      },
    });
  }

  // FIND BY ID

  // ServiceRequestRepository.ts
  async findById(id: string) {
    if (!id) {
      return null;
    }

    return prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        category: true,
        requester: REQUESTER_SELECT,
        targetProfessional: TARGET_PROFESSIONAL_SELECT,
      },
    });
  }

  // FIND USER'S REQUESTS

  async findByUserId(userId: string) {
    return prisma.serviceRequest.findMany({
      where: { requesterId: userId },

      orderBy: { createdAt: "desc" },

      include: {
        category: true,

        targetProfessional: TARGET_PROFESSIONAL_SELECT,
      },
    });
  }
  // STEP 6: ACCEPT BOOKING (Customer accepts professional's quote/offer)
  async acceptAtomic(bookingId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      // 1. Fetch target booking
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
      });

      if (!booking || booking.status !== BookingStatus.PENDING) {
        return null;
      }

      // 2. Fetch associated parent ServiceRequest
      const request = await tx.serviceRequest.findUnique({
        where: { id: booking.serviceRequestId },
      });

      if (!request || request.status !== RequestStatus.OPEN) {
        return null;
      }

      // 3. Verify user authorization (Ensure the user accepting is the customer/requester)
      if (request.requesterId !== userId && booking.userId !== userId) {
        return null;
      }

      // 4. Verify targeted professional constraints (if specific professional was requested)
      if (
        request.targetProfessionalId &&
        request.targetProfessionalId !== booking.professionalId
      ) {
        return null;
      }

      // 5. Accept the chosen booking
      const acceptedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.ACCEPTED,
          acceptedAt: new Date(),
        },
      });

      // 6. Reject all other pending bookings for this service request
      await tx.booking.updateMany({
        where: {
          serviceRequestId: booking.serviceRequestId,
          id: { not: bookingId },
          status: BookingStatus.PENDING,
        },
        data: { status: BookingStatus.REJECTED },
      });

      // 7. Update parent ServiceRequest status and link chosen professional
      await tx.serviceRequest.update({
        where: { id: booking.serviceRequestId },
        data: {
          status: RequestStatus.ACCEPTED,
          targetProfessionalId: booking.professionalId,
        },
      });

      return acceptedBooking;
    });
  }
  // UPDATE (OPEN Request + Requester ownership check)

  async updateAtomic(
    requestId: string,

    userId: string,

    data: UpdateServiceRequestDto,
  ) {
    return prisma.$transaction(async (tx) => {
      const request = await tx.serviceRequest.findUnique({
        where: { id: requestId },
      });

      if (
        !request ||
        request.requesterId !== userId ||
        request.status !== RequestStatus.OPEN
      ) {
        return null;
      }

      return tx.serviceRequest.update({
        where: { id: requestId },

        data,
      });
    });
  }
  // CANCEL REQUEST & PENDING BOOKINGS
  async cancelAtomic(requestId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const request = await tx.serviceRequest.findUnique({
        where: { id: requestId },
      });

      if (
        !request ||
        request.requesterId !== userId ||
        request.status !== RequestStatus.OPEN
      ) {
        return null;
      }

      await tx.booking.updateMany({
        where: {
          serviceRequestId: requestId,

          status: BookingStatus.PENDING,
        },

        data: { status: BookingStatus.CANCELLED },
      });

      return tx.serviceRequest.update({
        where: { id: requestId },

        data: { status: RequestStatus.CANCELLED },
      });
    });
  }
  // GET ALL OFFERS FOR A SPECIFIC SERVICE REQUEST
  async findByServiceRequestId(serviceRequestId: string) {
    return prisma.booking.findMany({
      where: {
        serviceRequestId,
      },
      include: {
        professional: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
