import { NextResponse } from "next/server";

import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function completeBooking(id: string) {
  const result = await bookingService.completeBooking(id);

  return NextResponse.json(result);
}
