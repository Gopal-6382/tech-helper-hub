import { IssueReportRepository } from "../repositories/issue-report.repository";
import { EmailService } from "@/utils/email.service";

import { CreateIssueReportData } from "../types/issue-report.types";

import { createIssueReportSchema } from "../validations/issue-report.validations";

export class IssueReportService {
  private issueReport = new IssueReportRepository();
  private emailService = new EmailService();

  async createReport(data: CreateIssueReportData) {
    // 1. Validate only client-provided fields
    const validatedData = createIssueReportSchema.parse({
      category: data.category,
      title: data.title,
      description: data.description,
      rating: data.rating,
      pageUrl: data.pageUrl,
    });

    // 2. Save the report
    const report = await this.issueReport.create({
      ...validatedData,
      userId: data.userId,
    });

    // 3. Find the authenticated user's email
    const user = await this.issueReport.findUserEmail(data.userId);

    if (!user) {
      throw new Error("User not found");
    }

    // 4. Send notification email
    try {
      await this.emailService.sendIssueReportEmail({
        category: report.category,
        title: report.title,
        description: report.description,
        rating: report.rating ?? undefined,
        pageUrl: report.pageUrl ?? undefined,
        userEmail: user.email,
      });
    } catch (error) {
      // Don't lose the issue report just because email failed.
      console.error("Failed to send issue report email:", error);
    }

    // 5. Return database record
    return report;
  }
}
