import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function getBooking(id: string) {
  

  return await bookingService.getBooking(id);
}
