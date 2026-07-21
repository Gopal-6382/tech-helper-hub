import { NextRequest } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";

import { getRequest } from "@/modules/servicerequest/actions/get-request.action";
import { updateRequest } from "@/modules/servicerequest/actions/update-request.action";

export const GET = authMiddleware(async (req, user, context) => {
  const { id } = await context.params;

  return getRequest(req, user, id);
});

export const PATCH = authMiddleware(async (req, user, context) => {
  const { id } = await context.params;

  return updateRequest(req, user, id);
});
