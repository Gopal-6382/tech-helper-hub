import { RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  CreateServiceRequestDto,
  UpdateServiceRequestDto,
} from "../types/service-request.types";

export class ServiceRequestRepository {
  async findById(id: string) {
    return prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        category: true,
        requester: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.serviceRequest.findMany({
      where: { requesterId: userId },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(userId: string, data: CreateServiceRequestDto) {
    return prisma.serviceRequest.create({
      data: {
        requester: { connect: { id: userId } },
        category: { connect: { id: data.categoryId } },
        title: data.title,
        description: data.description,
        images: data.images,
        mode: data.mode,
        budget: data.budget,
        address: data.address,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  }

  /**
   * Atomic Update: Checks requesterId and ensures status is not CANCELLED
   * directly in the DB write query to eliminate race conditions.
   */
  async updateAtomic(
    requestId: string,
    userId: string,
    data: UpdateServiceRequestDto
  ) {
    const result = await prisma.serviceRequest.updateMany({
      where: {
        id: requestId,
        requesterId: userId,
        status: { not: RequestStatus.CANCELLED },
      },
      data,
    });

    if (result.count === 0) {
      return null;
    }

    return this.findById(requestId);
  }

  /**
   * Atomic Cancel: Only updates IF status is not CANCELLED and requester owns it.
   */
  async cancelAtomic(requestId: string, userId: string) {
    const result = await prisma.serviceRequest.updateMany({
      where: {
        id: requestId,
        requesterId: userId,
        status: { not: RequestStatus.CANCELLED },
      },
      data: {
        status: RequestStatus.CANCELLED,
      },
    });

    if (result.count === 0) {
      return null;
    }

    return this.findById(requestId);
  }
}