import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";
import { ProfessionalService } from "../services/professional.service";

const professionalService = new ProfessionalService();

export async function getProfessional(
  req: NextRequest,
  user: JwtPayload,
) {
  const professional =
    await professionalService.getProfessional(
      user.userId,
    );

  return NextResponse.json({
    success: true,
    professional,
  });
}