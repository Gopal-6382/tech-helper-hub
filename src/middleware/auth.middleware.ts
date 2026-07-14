import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, JwtPayload } from "@/lib/auth";

export function authMiddleware(
  handler: (req: NextRequest, user: JwtPayload) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const authHeader = req.headers.get("authorization");

      if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 401 }
        );
      }

      const token = authHeader.split(" ")[1];

      const user = verifyAccessToken(token);

      return handler(req, user);
    } 
    catch (error) {
  console.log(error);

  return NextResponse.json(
    {
      success: false,
      message: error instanceof Error ? error.message : "Invalid token",
    },
    {
      status: 401,
    }
  );
}
  };
}