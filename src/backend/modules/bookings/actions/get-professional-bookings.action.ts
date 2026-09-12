import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function getProfessionalBookingsAction(professionalId: string) {
  return bookingService.getProfessionalBookings(professionalId);
}
