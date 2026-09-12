import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function getMyBookingsAction(userId: string) {
  return bookingService.getUserBookings(userId);
}
