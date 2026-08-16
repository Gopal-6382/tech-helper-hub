import { NextRequest } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { getMyReports } from "@/modules/postreport/actions/get-my-reports.action";

export const GET = authMiddleware(async (req: NextRequest, user) => {
  return handleRequest(async () => {
    return getMyReports(user.userId);
  });
});
