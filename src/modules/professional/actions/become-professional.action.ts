import { NextRequest, NextResponse } from "next/server";
import { ProfessionalService } from "../services/professional.service";
import { becomeProfessionalSchema } from "../validations/professional.validation";
import { JwtPayload } from "@/lib/auth";

const professionalService = new ProfessionalService();

export async function becomeProfessional(req: NextRequest, user: JwtPayload) {
  const body = await req.json();

  const data = becomeProfessionalSchema.parse(body);

  const professional = await professionalService.becomeProfessional(
    user.userId,
    data,
  );

  return NextResponse.json(
    {
      success: true,
      message: "Professional profile created successfully",
      professional,
    },
    {
      status: 201,
    },
  );
}
