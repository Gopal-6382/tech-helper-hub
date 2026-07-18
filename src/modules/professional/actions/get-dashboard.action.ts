import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";
import { ProfessionalService } from "../services/professional.service";

const professionalService = new ProfessionalService();

export async function dashboard(req: NextRequest, user: JwtPayload) {
  const dashboard = await professionalService.getDashboard(user.userId);

  return NextResponse.json({
    success: true,
    dashboard,
  });
}
