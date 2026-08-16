import { prisma } from "@/lib/prisma";
import { CreateIssueReportData } from "../types/issue-report.types";

export class IssueReportRepository {
  async create(data: CreateIssueReportData) {
    return prisma.issueReport.create({
      data,
    });
  }

  async findByUser(userId: string) {
    return prisma.issueReport.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.issueReport.findUnique({
      where: { id },
    });
  }
}
