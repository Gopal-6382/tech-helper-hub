import { ServiceRequestService } from "../services/service-request.service";
import { UpdateServiceRequestDto } from "../types/service-request.types";

const serviceRequestService = new ServiceRequestService();

export async function updateRequest(
  userId: string,
  requestId: string,
  data: UpdateServiceRequestDto,
) {
  return await serviceRequestService.updateRequest(userId, requestId, data);
}
