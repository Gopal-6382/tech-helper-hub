import { ReportStatus } from "@prisma/client";

export interface CreateReportData {
  postId?: string;
  commentId?: string;
  reason: string;
}

export interface UpdateReportStatusData {
  status: ReportStatus;
}
