// src/modules/service-request/services/service-request.service.ts

import { Role, RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import { ServiceRequestRepository } from "../repositories/service-request.repository";
import { CategoryRepository } from "@/admin/categories/repositories/categories.repository";

import {
  CreateServiceRequestDto,
  UpdateServiceRequestDto,
} from "../validations/service-request.validation";

import {
  AppError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} from "@/utils/api-response";

export class ServiceRequestService {
  private serviceRequestRepository = new ServiceRequestRepository();
  private categoryRepository = new CategoryRepository();

  // --------------------------------------------------
  // CREATE REQUEST
  // --------------------------------------------------

  async createRequest(userId: string, data: CreateServiceRequestDto) {
    // 1. Validate category
    const category = await this.categoryRepository.findById(data.categoryId);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    if (!category.isActive) {
      throw new AppError(
        "Cannot create request under an inactive category",
        400,
      );
    }

    // 2. Validate targeted professional
    if (data.targetProfessionalId) {
      const targetProfessional = await prisma.professionalProfile.findUnique({
        where: {
          id: data.targetProfessionalId,
        },

        include: {
          user: {
            select: {
              id: true,
              roles: true,
              isActive: true,
            },
          },
        },
      });

      if (!targetProfessional) {
        throw new NotFoundError("Targeted professional profile not found");
      }

      // Cannot target yourself
      if (targetProfessional.userId === userId) {
        throw new AppError(
          "You cannot create a service request targeted at yourself",
          400,
        );
      }

      // Must actually be a professional
      if (!targetProfessional.user.roles.includes(Role.PROFESSIONAL)) {
        throw new AppError(
          "Targeted user is not a registered professional",
          400,
        );
      }

      // Professional must be active
      if (!targetProfessional.user.isActive) {
        throw new AppError("Targeted professional is not active", 400);
      }
    }

    // 3. Create OPEN request
    return this.serviceRequestRepository.create(userId, data);
  }

  // --------------------------------------------------
  // GET SINGLE REQUEST
  // --------------------------------------------------

  async getRequest(id: string) {
    const request = await this.serviceRequestRepository.findById(id);

    if (!request) {
      throw new NotFoundError("Service request not found");
    }

    return request;
  }

  // --------------------------------------------------
  // GET MY REQUESTS
  // --------------------------------------------------

  async getMyRequests(userId: string) {
    return this.serviceRequestRepository.findByUserId(userId);
  }
  // ACCEPT BOOKING (Customer accepts ONE offer)
  async acceptBooking(bookingId: string, userId: string) {
    const booking = await this.serviceRequestRepository.acceptAtomic(
      bookingId,
      userId,
    );

    if (!booking) {
      const existing = await this.serviceRequestRepository.findById(bookingId);

      if (!existing) {
        throw new NotFoundError("Booking not found");
      }

      // Authorization check on fallback error inspection
      if (existing.requesterId !== userId) {
        throw new UnauthorizedError(
          "You are not authorized to accept this booking",
        );
      }

      // State mismatch (already accepted, cancelled, or parent request closed)
      throw new ConflictError(
        "Booking cannot be accepted. It may already be processed or closed.",
      );
    }

    return booking;
  }
  // --------------------------------------------------
  // UPDATE REQUEST
  //
  // Only owner + OPEN request
  // --------------------------------------------------

  async updateRequest(
    userId: string,
    requestId: string,
    data: UpdateServiceRequestDto,
  ) {
    // If category is being changed,
    // validate the new category.
    if (data.categoryId) {
      const category = await this.categoryRepository.findById(data.categoryId);

      if (!category) {
        throw new NotFoundError("Category not found");
      }

      if (!category.isActive) {
        throw new AppError(
          "Cannot change request to an inactive category",
          400,
        );
      }
    }

    const updatedRequest = await this.serviceRequestRepository.updateAtomic(
      requestId,
      userId,
      data,
    );

    if (updatedRequest) {
      return updatedRequest;
    }

    // Determine why update failed
    const existing = await this.serviceRequestRepository.findById(requestId);

    if (!existing) {
      throw new NotFoundError("Service request not found");
    }

    if (existing.requesterId !== userId) {
      throw new UnauthorizedError("Not authorized to update this request");
    }

    if (existing.status !== RequestStatus.OPEN) {
      throw new ConflictError(
        `Request cannot be updated because it is currently ${existing.status}`,
      );
    }

    // Should normally never reach here
    throw new ConflictError("Unable to update service request");
  }

  // --------------------------------------------------
  // CANCEL REQUEST
  //
  // Only owner + OPEN request
  // --------------------------------------------------

  async cancelRequest(userId: string, requestId: string) {
    const cancelledRequest = await this.serviceRequestRepository.cancelAtomic(
      requestId,
      userId,
    );

    if (cancelledRequest) {
      return cancelledRequest;
    }

    // Determine why cancellation failed
    const existing = await this.serviceRequestRepository.findById(requestId);

    if (!existing) {
      throw new NotFoundError("Service request not found");
    }

    if (existing.requesterId !== userId) {
      throw new UnauthorizedError("Not authorized to cancel this request");
    }

    if (existing.status === RequestStatus.CANCELLED) {
      throw new ConflictError("Request is already cancelled");
    }

    throw new ConflictError(
      `Cannot cancel request that is already ${existing.status}`,
    );
  }

  async getOffersForServiceRequest(serviceRequestId: string, userId: string) {
    // 1. Validate that the parent Service Request exists
    const request =
      await this.serviceRequestRepository.findById(serviceRequestId);

    if (!request) {
      throw new NotFoundError("Service request not found");
    }

    // 2. Authorization Check: Ensure the requester is the owner of the service request
    if (request.requesterId !== userId) {
      throw new UnauthorizedError(
        "You are not authorized to view offers for this service request",
      );
    }

    // 3. Fetch all submitted booking quotes via repository
    const offers =
      await this.serviceRequestRepository.findByServiceRequestId(
        serviceRequestId,
      );

    return offers;
  }
}
