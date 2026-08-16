import { prisma } from "@/lib/prisma";
import {
  CreateReportData,
  UpdateReportStatusData,
} from "../types/postreport.types";

export class PostReportRepository {
  async createReport(reporterId: string, data: CreateReportData) {
    return prisma.report.create({
      data: {
        reporterId,
        postId: data.postId,
        commentId: data.commentId,
        reason: data.reason,
      },
    });
  }

  async findPostById(id: string) {
    return prisma.problemPost.findUnique({
      where: { id },
    });
  }

  async findCommentById(id: string) {
    return prisma.comment.findUnique({
      where: { id },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
      },
    });
  }

  async findReportById(id: string) {
    return prisma.report.findUnique({
      where: { id },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        post: true,
        comment: true,
      },
    });
  }

  async findMyReports(userId: string) {
    return prisma.report.findMany({
      where: {
        reporterId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findReports() {
    return prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        post: true,
        comment: true,
      },
    });
  }

  async updateReportStatus(reportId: string, data: UpdateReportStatusData) {
    return prisma.report.update({
      where: {
        id: reportId,
      },
      data: {
        status: data.status,
        reviewedAt: new Date(),
      },
    });
  }
}
