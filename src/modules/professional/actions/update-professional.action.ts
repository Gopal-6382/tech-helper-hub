import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";
import { ProfessionalService } from "../services/professional.service";
import { updateProfessionalSchema } from "../validations/professional.validation";

const professionalService = new ProfessionalService();

export async function updateProfessional(req: NextRequest, user: JwtPayload) {
  const body = await req.json();

  const data = updateProfessionalSchema.parse(body);

  const professional = await professionalService.updateProfessional(
    user.userId,
    data,
  );

  return NextResponse.json({
    success: true,
    message: "Professional updated successfully",
    professional,
  });
}
