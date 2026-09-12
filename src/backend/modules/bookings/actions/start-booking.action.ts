import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function startBookingAction(
  bookingId: string,
  professionalId: string,
) {
  return bookingService.startBooking(bookingId, professionalId);
}
