import { NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export async function getMyBookings(user: JwtPayload) {
  const result = await bookingService.getUserBookings(user.userId);

  return NextResponse.json(result);
}
