import { routeHandler } from "@/middleware/route.handler";
import { getReport } from "@/modules/postreport/actions/get-report.action";
import { updateReportStatus } from "@/modules/postreport/actions/update-report-status.action";
import { updateReportStatusSchema } from "@/modules/postreport/validations/postreport.validations";
import { USER_ROLES } from "@/constant/role.constant";
import { UpdateReportStatusData } from "@/modules/postreport/types/postreport.types";

type ReportRouteParams = {
  reportId: string;
};

// GET /api/postreport/[reportId]
export const GET = routeHandler<ReportRouteParams>(
  async (_req, user, { params }) => {
    const { reportId } = await params;

    if (!reportId) {
      throw new Error("reportId is required");
    }

    return getReport(reportId, user.userId);
  },
  {
    roles: USER_ROLES,
  },
);

// PATCH /api/postreport/[reportId]
export const PATCH = routeHandler<ReportRouteParams>(
  async (req, user, { params }) => {
    const { reportId } = await params;

    if (!reportId) {
      throw new Error("reportId is required");
    }

    const body: UpdateReportStatusData = await req.json();
    const data = updateReportStatusSchema.parse(body);

    return updateReportStatus(reportId, user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
