// src/modules/service-request/actions/get-request.action.ts
import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function getRequestAction(requestId: string) {
  return serviceRequestService.getRequest(requestId);
}