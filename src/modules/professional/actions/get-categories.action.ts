import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";
import { ProfessionalService } from "../services/professional.service";

const professionalService = new ProfessionalService();

export async function getCategories(_req: NextRequest, _user: JwtPayload) {
  const categories = await professionalService.getCategories();

  return NextResponse.json({
    success: true,
    categories,
  });
}
console.log(getCategories);