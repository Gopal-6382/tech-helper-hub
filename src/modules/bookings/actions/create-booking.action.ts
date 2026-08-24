import { BookingService } from "../services/booking.service";
import { CreateBookingDto } from "../types/booking.types";

const bookingService = new BookingService();

export async function createBooking(userId: string, data: CreateBookingDto) {
  return bookingService.createBooking(userId, data);
}
