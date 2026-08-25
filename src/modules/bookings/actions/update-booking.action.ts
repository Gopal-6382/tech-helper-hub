import { BookingService } from "../services/booking.service";
import { UpdateBookingDto } from "../types/booking.types";

const bookingService = new BookingService();

export async function updatebooking(id: string, data: UpdateBookingDto) {
  return await bookingService.updateBooking(id,data);
}
