import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { VerificationService } from "../services/verification.service";
import { updateVerificationSchema } from "../validations/verification.validation";

const verificationService = new VerificationService();

export async function updateVerification(
  req: NextRequest,
  user: JwtPayload,
) {
  const body = await req.json();

  const data = updateVerificationSchema.parse(body);

  const result =
    await verificationService.updateVerification(
      user.userId,
      data,
    );

  return NextResponse.json(result);
}