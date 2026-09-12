import { PostReportService } from "../services/postreport.service";

const postReportService = new PostReportService();

export async function getMyReports(userId: string) {
  return postReportService.getMyReports(userId);
}
