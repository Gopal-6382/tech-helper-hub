import { NextRequest } from "next/server";

import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";
import { createIssueReport } from "@/modules/mailreports/actions/createIssueReport.action";

export const POST = authMiddleware(
  async (req: NextRequest, user) => {
    return handleRequest(async () => {
      const body = await req.json();

      return createIssueReport(
        user.userId,
        body,
      );
    });
  },
);