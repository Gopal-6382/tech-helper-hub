import { NextResponse } from "next/server";

import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function rejectBooking(id: string) {
  const result =
    await bookingService.rejectBooking(id);

  return NextResponse.json(result);
}