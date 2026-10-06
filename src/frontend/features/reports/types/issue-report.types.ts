export enum IssueReportCategory {
  BUG = "BUG",
  PAYMENT = "PAYMENT",
  ACCOUNT = "ACCOUNT",
  BOOKING = "BOOKING",
  CHAT = "CHAT",
  CONTENT = "CONTENT",
  UI = "UI",
  OTHER = "OTHER",
}

export interface CreateIssueReportInput {
  category: IssueReportCategory;
  title: string;
  description: string;
  rating: number;
  pageUrl: string;
}

export interface IssueReportResponse {
  message?: string;
}
