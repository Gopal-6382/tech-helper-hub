export type ReportStatus = "PENDING" | "REVIEWED" | "RESOLVED" | "REJECTED";

export type CreateReportData = {
  postId?: string;
  commentId?: string;
  reason: string;
};

export type Report = {
  id: string;
  postId: string | null;
  commentId: string | null;
  reporterId: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
};
