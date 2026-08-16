export interface CreateIssueReportData {
  userId: string;
  category:
    | "BUG"
    | "PAYMENT"
    | "ACCOUNT"
    | "BOOKING"
    | "CHAT"
    | "CONTENT"
    | "UI"
    | "OTHER";
  title: string;
  description: string;
  rating?: number;
  pageUrl?: string;
}