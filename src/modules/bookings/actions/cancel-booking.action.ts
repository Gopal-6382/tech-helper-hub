"use server";

import { BookingService } from "@/modules/bookings/services/booking.service";

const bookingService = new BookingService();

export async function cancelOpenRequestAction(
  bookingId: string,
  professionalId: string,
  cancelReason: string,
) {
  return await bookingService.cancelOpenRequest(
    bookingId,
    professionalId,
    cancelReason,
  );
}
