// src/modules/service-request/services/service-request.service.ts
import { RequestStatus, Role } from "@prisma/client";
import { prisma } from "@/lib/prisma"; // Used here strictly for the quick user validation check
import { ServiceRequestRepository } from "../repositories/service-request.repository";
import { CategoryRepository } from "@/admin/categories/repositories/categories.repository";
import { CreateServiceRequestDto, UpdateServiceRequestDto } from "../validations/service-request.validation";
import { AppError, NotFoundError, UnauthorizedError, ConflictError } from "@/utils/api-response";

export class ServiceRequestService {
  private serviceRequestRepository = new ServiceRequestRepository();
  private categoryRepository = new CategoryRepository();

  async createRequest(userId: string, data: CreateServiceRequestDto) {
    // 1. Check Category rules
    const category = await this.categoryRepository.findById(data.categoryId);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    if (!category.isActive) {
      throw new AppError("Cannot create request under an inactive category", 400);
    }

    // 2. Check Target Professional rules
    if (data.targetProfessionalId) {
      const targetPro = await prisma.professionalProfile.findUnique({
        where: { id: data.targetProfessionalId },
        include: { user: true },
      });
      
      if (!targetPro) {
        throw new NotFoundError("Targeted professional profile not found");
      }

      //  Block self-targeting: Requester cannot select their own professional profile
      if (targetPro.userId === userId) {
        throw new AppError("You cannot create a service request targeted at yourself", 400);
      }
      
      if (!targetPro.user.roles.includes(Role.PROFESSIONAL)) {
        throw new AppError("Targeted user is not a registered professional", 400);
      }
    }
    // 3. Create the request
    return this.serviceRequestRepository.create(userId, data);
  }

  async getRequest(id: string) {
    const request = await this.serviceRequestRepository.findById(id);
    if (!request) throw new NotFoundError("Service request not found");
    return request;
  }

  async getMyRequests(userId: string) {
    return this.serviceRequestRepository.findByUserId(userId);
  }

  async getOpenRequestsForProfessional(professionalId: string) {
    // Used by professionals to browse the marketplace
    return this.serviceRequestRepository.findOpenRequests(professionalId);
  }

  async updateRequest(userId: string, requestId: string, data: UpdateServiceRequestDto) {
    if (data.categoryId) {
      const category = await this.categoryRepository.findById(data.categoryId);
      if (!category || !category.isActive) {
        throw new AppError("Invalid or inactive category", 400);
      }
    }

    const updatedRequest = await this.serviceRequestRepository.updateAtomic(requestId, userId, data);

    if (!updatedRequest) {
      const existing = await this.serviceRequestRepository.findById(requestId);
      if (!existing) throw new NotFoundError("Service request not found");
      if (existing.requesterId !== userId) throw new UnauthorizedError("Not authorized to update this request");
      if (existing.status !== RequestStatus.OPEN) {
        throw new ConflictError(`Request cannot be updated because it is currently ${existing.status}`);
      }
    }

    return updatedRequest;
  }

  async cancelRequest(userId: string, requestId: string) {
    const cancelledRequest = await this.serviceRequestRepository.cancelAtomic(requestId, userId);

    if (!cancelledRequest) {
      const existing = await this.serviceRequestRepository.findById(requestId);
      if (!existing) throw new NotFoundError("Service request not found");
      if (existing.requesterId !== userId) throw new UnauthorizedError("Not authorized to cancel this request");
      if (existing.status === RequestStatus.CANCELLED) throw new ConflictError("Request is already cancelled");
      
      throw new ConflictError(`Cannot cancel request that is already ${existing.status}`);
    }

    return cancelledRequest;
  }
}