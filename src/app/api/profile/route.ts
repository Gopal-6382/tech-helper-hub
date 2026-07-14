import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { JwtPayload } from "@/lib/auth";

async function profile(req: NextRequest, user: JwtPayload) {
  return NextResponse.json({
    success: true,
    user,
  });
}

export const GET = authMiddleware(profile);