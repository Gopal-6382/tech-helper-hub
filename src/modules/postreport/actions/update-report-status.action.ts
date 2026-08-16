import { PostReportService } from "../services/postreport.service";
import { UpdateReportStatusData } from "../types/postreport.types";

const postReportService = new PostReportService();

export async function updateReportStatus(
  reportId: string,
  userId: string,
  data: UpdateReportStatusData,
) {
  return postReportService.updateReportStatus(reportId, userId, data);
}
