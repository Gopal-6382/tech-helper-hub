// src/modules/service-request/actions/get-open-requests.action.ts
import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();

export async function getOpenRequestsAction(professionalId: string) {
  // This fetches public requests PLUS requests targeted specifically at this professional
  return serviceRequestService.getOpenRequestsForProfessional(professionalId);
}