import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function getRequest(requestId: string) {
  return await serviceRequestService.getRequest(requestId);
}
