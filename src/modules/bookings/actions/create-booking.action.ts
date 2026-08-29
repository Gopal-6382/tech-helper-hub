import { BookingService } from "../services/booking.service";
import { CreateBookingDto } from "../validations/booking.validation";

const bookingService = new BookingService();

export async function createBookingAction(
  currentUserId: string,
  dto: CreateBookingDto,
) {
  return bookingService.createBooking(currentUserId, dto);
}
