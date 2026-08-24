import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function acceptBooking(id: string) {
  return bookingService.acceptBooking(id);
}
