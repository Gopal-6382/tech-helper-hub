import { authMiddleware } from "@/middleware/auth.middleware";
import { logoutAction } from "@/modules/auth/actions/logout.action";
import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "@/lib/auth";

export const POST = authMiddleware(
  async (req: NextRequest, user: JwtPayload) => {
    const response = await logoutAction(user.userId);
    return NextResponse.json(response);
  },
);
