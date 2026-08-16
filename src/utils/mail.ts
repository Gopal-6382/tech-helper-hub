export class EmailService {
  async sendIssueReportEmail(data: {
    category: string;
    title: string;
    description: string;
    rating?: number;
    pageUrl?: string;
    userEmail: string;
  }) {
    // Call your email provider here.
  }
}