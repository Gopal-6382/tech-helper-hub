import { NextResponse } from "next/server";
import { ProfessionalService } from "@/modules/professional/services/professional.service";

const professionalService = new ProfessionalService();

export async function updateAvailabilityAction(
  req: Request,
  user: { userId: string },
) {
  const body = await req.json();

  if (typeof body.isAvailable !== "boolean") {
    throw new Error("isAvailable must be a boolean");
  }

  const result = await professionalService.updateAvailability(
    user.userId,
    body.isAvailable,
  );

  return NextResponse.json({
    success: true,
    message: "Availability updated successfully",
    data: result,
  });
}
