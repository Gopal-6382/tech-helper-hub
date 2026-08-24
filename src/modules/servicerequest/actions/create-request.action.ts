import { ServiceRequestService } from "../services/service-request.service";
import { CreateServiceRequestDto } from "../types/service-request.types";

const serviceRequestService = new ServiceRequestService();

export async function createRequest(
  user: string,
  data: CreateServiceRequestDto,
) {
  return await serviceRequestService.createRequest(user, data);
}
