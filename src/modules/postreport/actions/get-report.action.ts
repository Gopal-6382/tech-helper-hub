import { PostReportService } from "../services/postreport.service";

const postReportService = new PostReportService();

export async function getReport(reportId: string, userId: string) {
  return postReportService.getReport(reportId, userId);
}
