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
      // 1. Get JWT from Authorization header
      const token = extractBearerToken(req.headers.get("authorization"));

      // 2. Verify JWT payload
      const user = verifyAccessToken(token);

      // 3. Centralized Active Status Check
      if (!options?.skipActiveCheck) {
        const isActive = await userRepository.getActiveStatus(user.userId);
        if (!isActive) {
          return errorResponse("Account is deactivated", 403);
        }
      }

      // 4. Optional role authorization
      if (
        options?.roles &&
        !options.roles.some((role) => user.roles.includes(role))
      ) {
        return errorResponse("Forbidden", 403);
      }

      // 5. Execute route logic
      const data = await handler(req, user, context);

      // 6. Return response
      return successResponse(data);
    } catch (error) {
      return handleApiError(error);
    }
  };
}