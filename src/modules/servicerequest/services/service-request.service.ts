import { RequestStatus } from "@prisma/client";

import { ServiceRequestRepository } from "../repositories/service-request.repository";

import {
  CreateServiceRequestDto,
  UpdateServiceRequestDto,
} from "../types/service-request.types";

export class ServiceRequestService {
  private serviceRequestRepository =
    new ServiceRequestRepository();

  async createRequest(
    userId: string,
    data: CreateServiceRequestDto,
  ) {
    return this.serviceRequestRepository.create(
      userId,
      data,
    );
  }

  async getRequest(id: string) {
    const request =
      await this.serviceRequestRepository.findById(
        id,
      );

    if (!request) {
      throw new Error("Service request not found");
    }

    return request;
  }

  async getMyRequests(userId: string) {
    return this.serviceRequestRepository.findByUserId(
      userId,
    );
  }

  async updateRequest(
    userId: string,
    requestId: string,
    data: UpdateServiceRequestDto,
  ) {
    const request =
      await this.getRequest(requestId);

    if (request.userId !== userId) {
      throw new Error("Unauthorized");
    }

    if (
      request.status === RequestStatus.CANCELLED
    ) {
      throw new Error(
        "Cancelled request cannot be updated",
      );
    }

    return this.serviceRequestRepository.update(
      requestId,
      data,
    );
  }

  async cancelRequest(
    userId: string,
    requestId: string,
  ) {
    const request =
      await this.getRequest(requestId);

    if (request.userId !== userId) {
      throw new Error("Unauthorized");
    }

    if (
      request.status === RequestStatus.CANCELLED
    ) {
      throw new Error(
        "Request already cancelled",
      );
    }

    return this.serviceRequestRepository.cancel(
      requestId,
    );
  }
}