// src/modules/service-request/actions/get-open-requests.action.ts
import { BookingService } from "../services/booking.service";
const bookingService = new BookingService();

export async function getOpenRequestsAction(professionalId: string) {
  // This fetches public requests PLUS requests targeted specifically at this professional
  return bookingService.getOpenRequestsForProfessional(professionalId);
}
