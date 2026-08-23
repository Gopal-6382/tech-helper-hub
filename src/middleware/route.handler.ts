import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { extractBearerToken, verifyAccessToken, JwtPayload } from "@/lib/jwt";

import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/utils/api-response";

//Route Handler type definition
type RouteContext<TParams = Record<string, string>> = {
  params: Promise<TParams>;
};

//Route Handler type with their req user and context
type RouteHandler<TParams = Record<string, string>> = (
  req: NextRequest,
  user: JwtPayload,
  context: RouteContext<TParams>,
) => Promise<unknown>;

//Role types for acess the role validated that
type RouteOptions = {
  roles?: Role[];
};

/* Main route handler 
this route hanlder return the req and context
for get the tokene and the params from broswer return funtion works 
insite hanlder type and return the value req and userjwt and params value 
option role for access the role
*/

export function routeHandler<TParams = Record<string, string>>(
  handler: RouteHandler<TParams>,
  options?: RouteOptions,
) {
  return async (
    req: NextRequest,
    context: RouteContext<TParams>,
  ): Promise<NextResponse> => {
    try {
      // Get JWT from Authorization header
      const token = extractBearerToken(req.headers.get("authorization"));

      // Verify JWT
      const user = verifyAccessToken(token);

      //  Optional role authorization
      if (
        options?.roles &&
        !options.roles.some((role) => user.roles.includes(role))
      ) {
        return errorResponse("Forbidden", 403);
      }
      // Call actual route handler
      const data = await handler(req, user, context);

      // 5. Standard success response
      return successResponse(data);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
