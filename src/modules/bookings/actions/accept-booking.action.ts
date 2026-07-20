import { NextResponse } from "next/server";

import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function acceptBooking(id: string) {
  const result =
    await bookingService.acceptBooking(id);

  return NextResponse.json(result);
}