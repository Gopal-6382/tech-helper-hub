import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function cancelRequest(user: string, requestId: string) {
  return await serviceRequestService.cancelRequest(user, requestId);
}
