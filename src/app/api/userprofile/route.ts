import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { AuthService } from "@/modules/auth/services/auth.service";
import { JwtPayload } from "@/lib/auth";

const authService = new AuthService();

async function me(req: NextRequest, user: JwtPayload) {
  const result = await authService.getCurrentUser(user.userId);

  return NextResponse.json(result);
}

export const GET = authMiddleware(me);
