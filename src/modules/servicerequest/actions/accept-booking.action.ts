import { ServiceRequestService } from "../services/service-request.service";

const serviceRequestService = new ServiceRequestService();
export async function acceptBookingAction(bookingId: string, userId: string) {
  return serviceRequestService.acceptBooking(bookingId, userId);
}
