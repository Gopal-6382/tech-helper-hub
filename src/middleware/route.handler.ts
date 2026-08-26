import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { extractBearerToken, verifyAccessToken, JwtPayload } from "@/lib/jwt";
import { UserRepository } from "@/modules/users/repositories/user.repository";

import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/utils/api-response";

const userRepository = new UserRepository();

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
  skipActiveCheck?: boolean; // Optional flag if any specific route doesn't need active check (e.g., activate account endpoint)
};

export function routeHandler<TParams = Record<string, string>>(
  handler: RouteHandler<TParams>,
  options?: RouteOptions,
) {
  return async (
    req: NextRequest,
    context: RouteContext<TParams>,
  ): Promise<NextResponse> => {
    try {
      const token = extractBearerToken(req.headers.get("authorization"));
      const user = verifyAccessToken(token);

      // Fetch fresh user data (active status + roles) from DB in a single query
      const dbUser = await userRepository.findById(user.userId);

      if (!dbUser) {
        return errorResponse("User not found", 404);
      }

      if (!options?.skipActiveCheck && !dbUser.isActive) {
        return errorResponse("Account is deactivated", 403);
      }

      // Check roles against real-time database roles instead of stale JWT payload
      if (
        options?.roles &&
        !options.roles.some((role) => dbUser.roles.includes(role))
      ) {
        return errorResponse("Forbidden", 403);
      }

      // Pass user payload to handler
      const data = await handler(req, user, context);
      return successResponse(data);
    } catch (error) {
      return handleApiError(error);
    }
  };
}