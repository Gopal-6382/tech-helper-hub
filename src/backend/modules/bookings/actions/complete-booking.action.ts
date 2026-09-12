import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function completeBookingAction(
  bookingId: string,
  professionalId: string,
) {
  return bookingService.completeBooking(bookingId, professionalId);
}
