import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";
import { ProfessionalService } from "../services/professional.service";
import { updateProfessionalCategoriesSchema } from "../validations/professional.validation";

const professionalService = new ProfessionalService();

export async function updateCategories(req: NextRequest, user: JwtPayload) {
  const body = await req.json();

  const data = updateProfessionalCategoriesSchema.parse(body);

  const result = await professionalService.updateCategories(user.userId, data);

  return NextResponse.json(result);
}
