import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function rejectBooking(id: string) {
  return await bookingService.rejectBooking(id);
}
