import { NextRequest, NextResponse } from "next/server";

import { JwtPayload } from "@/lib/auth";

import { BookingService } from "../services/booking.service";
import { createBookingSchema } from "../validations/booking.validation";

const bookingService = new BookingService();

export async function createBooking(req: NextRequest, user: JwtPayload) {
  const body = await req.json();

  const data = createBookingSchema.parse(body);

  const result = await bookingService.createBooking(user.userId, data);

  return NextResponse.json(result, {
    status: 201,
  });
}
