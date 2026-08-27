import { ServiceRequestService } from "../services/service-request.service";
import { CreateServiceRequestDto } from "../validations/service-request.validation";

const serviceRequestService = new ServiceRequestService();

export async function createRequestAction(userId: string, data: CreateServiceRequestDto) {
  return serviceRequestService.createRequest(userId, data);
}