// src/modules/servicerequest/repositories/service-request.repository.ts
import { prisma } from "@/lib/prisma";
import { RequestStatus, BookingStatus } from "@prisma/client";
import { CreateServiceRequestDto, UpdateServiceRequestDto } from "../validations/service-request.validation";

export class ServiceRequestRepository {
  async create(userId: string, data: CreateServiceRequestDto) {
    return prisma.serviceRequest.create({
      data: {
        ...data,
        requesterId: userId,
        status: RequestStatus.OPEN,
      },
      include: {
        category: true,
        targetProfessional: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        category: true,
        requester: { select: { id: true, name: true, avatar: true } },
        targetProfessional: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.serviceRequest.findMany({
      where: { requesterId: userId },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  }

async findOpenRequests(userId: string) {
    if (!userId) {
      throw new Error("userId is required for findOpenRequests query");
    }

    return prisma.serviceRequest.findMany({
      where: {
        status: RequestStatus.OPEN,
        OR: [
          { targetProfessionalId: null }, // Public requests
          {
            targetProfessional: {
              userId: userId, // 🔴 Matches the User ID inside the targetProfessional relation
            },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        requester: { select: { id: true, name: true, avatar: true } },
      },
    });
  }

  async updateAtomic(requestId: string, userId: string, data: UpdateServiceRequestDto) {
    return prisma.$transaction(async (tx) => {
      const request = await tx.serviceRequest.findUnique({ where: { id: requestId } });

      if (!request || request.requesterId !== userId || request.status !== RequestStatus.OPEN) {
        return null;
      }

      return tx.serviceRequest.update({
        where: { id: requestId },
        data,
      });
    });
  }

  async cancelAtomic(requestId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const request = await tx.serviceRequest.findUnique({ where: { id: requestId } });

      if (!request || request.requesterId !== userId || request.status !== RequestStatus.OPEN) {
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
}