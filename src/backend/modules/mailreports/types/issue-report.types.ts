import { IssueCategory } from "@prisma/client";

export interface CreateIssueReportDto {
  category: IssueCategory;
  title: string;
  description: string;
  rating?: number;
  pageUrl?: string;
}

// Server-side data.
// userId comes from JWT, NOT from the request body.
export interface CreateIssueReportData extends CreateIssueReportDto {
  userId: string;
}
