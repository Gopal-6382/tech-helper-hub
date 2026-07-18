import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { VerificationService } from "../services/verification.service";
import { createVerificationSchema } from "../validations/verification.validation";

const verificationService = new VerificationService();

export async function uploadVerification(
  req: NextRequest,
  user: JwtPayload,
) {
  const body = await req.json();

  const data = createVerificationSchema.parse(body);

  const result =
    await verificationService.uploadVerification(
      user.userId,
      data,
    );

  return NextResponse.json(result, {
    status: 201,
  });
}