import { ServiceRequestRepository } from "../repositories/service-request.repository";
import { CategoryRepository } from "@/admin/categories/repositories/categories.repository";
import {
  CreateServiceRequestDto,
  UpdateServiceRequestDto,
} from "../types/service-request.types";
import {
  AppError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} from "@/utils/api-response";

export class ServiceRequestService {
  private serviceRequestRepository = new ServiceRequestRepository();
  private categoryRepository = new CategoryRepository();

  async createRequest(userId: string, data: CreateServiceRequestDto) {
    // 1. Verify Category exists & is active
    const category = await this.categoryRepository.findById(data.categoryId);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    if (!category.isActive) {
      throw new AppError("Cannot create request under an inactive category", 400);
    }

    return this.serviceRequestRepository.create(userId, data);
  }

  async getRequest(id: string) {
    const request = await this.serviceRequestRepository.findById(id);
    if (!request) {
      throw new NotFoundError("Service request not found");
    }
    return request;
  }

  async getMyRequests(userId: string) {
    return this.serviceRequestRepository.findByUserId(userId);
  }

  async updateRequest(
    userId: string,
    requestId: string,
    data: UpdateServiceRequestDto
  ) {
    // 1. Validate destination category if changing categories
    if (data.categoryId) {
      const category = await this.categoryRepository.findById(data.categoryId);
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      if (!category.isActive) {
        throw new AppError("Cannot change request to an inactive category", 400);
      }
    }

    // 2. Execute Atomic Update
    const updatedRequest = await this.serviceRequestRepository.updateAtomic(
      requestId,
      userId,
      data
    );

    // 3. If count === 0, determine exact reason (Not Found vs Unauthorized vs Cancelled)
    if (!updatedRequest) {
      const existing = await this.serviceRequestRepository.findById(requestId);
      if (!existing) {
        throw new NotFoundError("Service request not found");
      }
      if (existing.requesterId !== userId) {
        throw new UnauthorizedError("You are not authorized to update this request");
      }
      throw new ConflictError("Cancelled request cannot be updated");
    }

    return updatedRequest;
  }

  async cancelRequest(userId: string, requestId: string) {
    // 1. Execute Atomic Cancellation directly
    const cancelledRequest = await this.serviceRequestRepository.cancelAtomic(
      requestId,
      userId
    );

    // 2. If atomic update fails (count === 0), determine cause cleanly
    if (!cancelledRequest) {
      const existing = await this.serviceRequestRepository.findById(requestId);
      if (!existing) {
        throw new NotFoundError("Service request not found");
      }
      if (existing.requesterId !== userId) {
        throw new UnauthorizedError("You are not authorized to cancel this request");
      }
      throw new ConflictError("Request is already cancelled");
    }

    return cancelledRequest;
  }
}