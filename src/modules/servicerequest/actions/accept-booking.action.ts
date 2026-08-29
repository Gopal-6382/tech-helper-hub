import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();
export async function acceptBookingAction(
  serviceRequestId: string,
  userId: string,
) {
  return serviceRequestService.acceptBooking(
    serviceRequestId,
    userId,
  );
}