import { NextRequest } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { createReport } from "@/modules/postreport/actions/create-report.action";
import { getReports } from "@/modules/postreport/actions/get-reports.action";

import { CreateReportData } from "@/modules/postreport/types/postreport.types";

export const POST = authMiddleware(async (req: NextRequest, user) => {
  return handleRequest(async () => {
    const body: CreateReportData = await req.json();

    return createReport(user.userId, body);
  });
});

export const GET = authMiddleware(async (req: NextRequest, user) => {
  return handleRequest(async () => {
    return getReports(user.userId);
  });
});
