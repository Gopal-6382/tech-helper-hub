import { IssueReportRepository } from "../repositories/issue-report.repository";
import { EmailService } from "@/utils/mail";
import { CreateIssueReportData } from "../types/issue-report.types";
import { createIssueReportSchema } from "../validations/issue-report.validations";

export class IssueReportService {
  private issueReport = new IssueReportRepository();
  private emailService = new EmailService();

  async createReport(data: CreateIssueReportData) {
    const validatedData = createIssueReportSchema.parse({
      category: data.category,
      title: data.title,
      description: data.description,
      rating: data.rating,
      pageUrl: data.pageUrl,
    });

    const report = await this.issueReport.create({
      ...validatedData,
      userId: data.userId,
    });

    await this.emailService.sendIssueReportEmail({
      category: report.category,
      title: report.title,
      description: report.description,
      rating: report.rating ?? undefined,
      pageUrl: report.pageUrl ?? undefined,
      userEmail: "", // obtain user email before sending
    });

    return report;
  }
}
