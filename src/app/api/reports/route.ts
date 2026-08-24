import { routeHandler } from "@/middleware/route.handler";
import { createReport } from "@/modules/postreport/actions/create-report.action";
import { getReports } from "@/modules/postreport/actions/get-reports.action";
import { createReportSchema } from "@/modules/postreport/validations/postreport.validations";
import { USER_ROLES } from "@/constant/role.constant";
import { CreateReportData } from "@/modules/postreport/types/postreport.types";

// POST /api/postreport
export const POST = routeHandler(
  async (req, user) => {
    const body: CreateReportData = await req.json();
    const data = createReportSchema.parse(body);

    return createReport(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);

// GET /api/postreport
export const GET = routeHandler(
  async (_req, user) => {
    return getReports(user.userId);
  },
  {
    roles: USER_ROLES,
  },
);
