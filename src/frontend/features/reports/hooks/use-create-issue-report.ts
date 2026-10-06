import { useMutation } from "@tanstack/react-query";

import { issueReportApi } from "../api/issue-report";

export function useCreateIssueReport() {
  return useMutation({
    mutationFn: issueReportApi.createReport,
  });
}
