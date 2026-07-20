import { NextResponse } from "next/server";

import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function getBooking(id: string) {
  const result = await bookingService.getBooking(id);

  return NextResponse.json(result);
}

