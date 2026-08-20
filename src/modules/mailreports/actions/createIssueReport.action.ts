import { IssueReportService } from "../services/issue-report.service";

import { CreateIssueReportDto } from "../types/issue-report.types";

const issueReportService = new IssueReportService();

export async function createIssueReport(
  userId: string,
  data: CreateIssueReportDto,
) {
  return issueReportService.createReport({
    ...data,
    userId,
  });
}
