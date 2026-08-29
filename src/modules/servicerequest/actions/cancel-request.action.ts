// src/modules/service-request/actions/cancel-request.action.ts
import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function cancelRequestAction(userId: string, requestId: string) {
  return serviceRequestService.cancelRequest(userId, requestId);
}
