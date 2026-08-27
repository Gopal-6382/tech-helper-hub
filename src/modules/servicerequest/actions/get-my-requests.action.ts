// src/modules/service-request/actions/get-my-requests.action.ts
import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function getMyRequestsAction(userId: string) {
  return serviceRequestService.getMyRequests(userId);
}