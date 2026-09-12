import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function getBookingAction(bookingId: string) {
  return bookingService.getBooking(bookingId);
}
