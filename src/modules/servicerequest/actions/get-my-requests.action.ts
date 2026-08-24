import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function getMyRequests(user: string) {
  return await serviceRequestService.getMyRequests(user);
}
