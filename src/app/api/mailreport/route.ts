import { routeHandler } from "@/middleware/route.handler";
import { createIssueReport } from "@/modules/mailreports/actions/createIssueReport.action";
import { CreateIssueReportDto } from "@/modules/mailreports/types/issue-report.types";
import { USER_ROLES } from "@/constant/role.constant";
import { createIssueReportSchema } from "@/modules/mailreports/validations/issue-report.validations";

export const POST = routeHandler(
  async (req, user) => {
    const body: CreateIssueReportDto = await req.json();
    const data = createIssueReportSchema.parse(body);
    return createIssueReport(user.userId, data);
  },
  {
    roles: USER_ROLES,
  },
);
