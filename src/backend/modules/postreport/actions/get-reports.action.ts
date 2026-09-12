import { PostReportService } from "../services/postreport.service";

const postReportService = new PostReportService();

export async function getReports(userId: string) {
  return postReportService.getReports(userId);
}
