import { ServiceRequestService } from "../services/service-request.service";
import { UpdateServiceRequestDto } from "../validations/service-request.validation";
const serviceRequestService = new ServiceRequestService();

export async function updateRequestAction(
  userId: string,
  requestId: string,
  dto: UpdateServiceRequestDto,
) {
  return serviceRequestService.updateRequest(userId, requestId, dto);
}
