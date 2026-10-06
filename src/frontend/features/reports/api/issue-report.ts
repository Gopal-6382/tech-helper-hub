import { apiRequest } from "@/frontend/lib/api";

import type {
  CreateIssueReportInput,
  IssueReportResponse,
} from "../types/issue-report.types";

export const issueReportApi = {
  async createReport(
    data: CreateIssueReportInput,
  ): Promise<IssueReportResponse> {
    const response = await apiRequest<IssueReportResponse>("/api/mailreport", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response.data ?? {};
  },
};
