import { PostReportService } from "../services/postreport.service";
import { CreateReportData } from "../types/postreport.types";

const postReportService = new PostReportService();

export async function createReport(reporterId: string, data: CreateReportData) {
  return postReportService.createReport(reporterId, data);
}
