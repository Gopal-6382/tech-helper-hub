import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();
export async function offerRequestsAction(
  serviceRequestId: string,
  userId: string,
) {
  return serviceRequestService.getOffersForServiceRequest(
    serviceRequestId,
    userId,
  );
}
