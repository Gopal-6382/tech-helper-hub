import { NextRequest } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";

import { getReport } from "@/modules/postreport/actions/get-report.action";
import { updateReportStatus } from "@/modules/postreport/actions/update-report-status.action";

import { UpdateReportStatusData } from "@/modules/postreport/types/postreport.types";

export const GET = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("reportId" in route)) {
        throw new Error("reportId missing");
      }

      const { reportId } = route;

      return getReport(reportId, user.userId);
    });
  },
);

export const PATCH = authMiddleware(
  async (req: NextRequest, user, { params }) => {
    return handleRequest(async () => {
      const route = await params;

      if (!route || !("reportId" in route)) {
        throw new Error("reportId missing");
      }

      const { reportId } = route;

      const body: UpdateReportStatusData = await req.json();

      return updateReportStatus(reportId, user.userId, body);
    });
  },
);
