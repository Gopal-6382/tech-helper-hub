
import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function completeBooking(id: string) {
  return await bookingService.completeBooking(id);
}
