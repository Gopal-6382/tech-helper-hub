export type ReportStatus =
  "PENDING" | "REVIEWED" | "DISMISSED" | "ACTION_TAKEN";

export interface CreateReportInput {
  postId?: string;
  commentId?: string;
  reason: string;
}

export interface Report {
  id: string;
  reporterId: string;
  postId: string | null;
  commentId: string | null;
  reason: string;
  status: ReportStatus;
  createdAt: string;
  reviewedAt: string | null;
}
