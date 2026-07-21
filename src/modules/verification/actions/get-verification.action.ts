import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

import { VerificationService } from "../services/verification.service";

const verificationService = new VerificationService();

export async function getVerification(req: NextRequest, user: JwtPayload) {
  const result = await verificationService.getVerification(user.userId);

  return NextResponse.json(result);
}
