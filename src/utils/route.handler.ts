import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

import {
  extractBearerToken,
  verifyAccessToken,
  JwtPayload,
} from "@/lib/jwt";

import {
  successResponse,
  errorResponse,
} from "@/utils/api-response";

type RouteContext<TParams = Record<string, string>> = {
  params: Promise<TParams>;
};

type RouteHandler<TParams = Record<string, string>> = (
  req: NextRequest,
  user: JwtPayload,
  context: RouteContext<TParams>,
) => Promise<unknown>;

type RouteOptions = {
  roles?: Role[];
};

export function routeHandler<
  TParams = Record<string, string>,
>(
  handler: RouteHandler<TParams>,
  options?: RouteOptions,
) {
  return async (
    req: NextRequest,
    context: RouteContext<TParams>,
  ): Promise<NextResponse> => {
    try {
      // 1. Get JWT from Authorization header
      const token = extractBearerToken(
        req.headers.get("authorization"),
      );

      // 2. Verify JWT
      const user = verifyAccessToken(token);

      // 3. Optional role authorization
      if (
        options?.roles &&
        !options.roles.includes(user.role)
      ) {
        return errorResponse("Forbidden", 403);
      }

      // 4. Call actual route handler
      const data = await handler(
        req,
        user,
        context,
      );

      // 5. Standard success response
      return successResponse(data);
    } catch (error) {
      console.error(error);

      return errorResponse(
        error instanceof Error
          ? error.message
          : "Internal Server Error",
        500,
      );
    }
  };
}