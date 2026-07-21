import { NextResponse } from "next/server";

import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function cancelBooking(id: string) {
  const result = await bookingService.cancelBooking(id);

  return NextResponse.json(result);
}
