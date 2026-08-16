import { PostReportRepository } from "../repositories/postreport.repository";
import {
  CreateReportData,
  UpdateReportStatusData,
} from "../types/postreport.types";
import {
  createReportSchema,
  updateReportStatusSchema,
} from "../validations/postreport.validations";

export class PostReportService {
  private postReport = new PostReportRepository();

  async createReport(reporterId: string, data: CreateReportData) {
    const validatedData = createReportSchema.parse(data);

    if (validatedData.postId) {
      const post = await this.postReport.findPostById(validatedData.postId);

      if (!post) {
        throw new Error("Post not found");
      }
    }

    if (validatedData.commentId) {
      const comment = await this.postReport.findCommentById(
        validatedData.commentId,
      );

      if (!comment) {
        throw new Error("Comment not found");
      }
    }

    return this.postReport.createReport(reporterId, validatedData);
  }

  async getMyReports(userId: string) {
    return this.postReport.findMyReports(userId);
  }

  async getReports(userId: string) {
    // Admin authorization belongs here.
    // Replace this with your actual UserRepository/admin check.
    const user = await this.postReport.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "ADMIN") {
      throw new Error("Only admin can view all reports");
    }

    return this.postReport.findReports();
  }

  async getReport(reportId: string, userId: string) {
    const user = await this.postReport.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "ADMIN") {
      throw new Error("Only admin can view reports");
    }

    const report = await this.postReport.findReportById(reportId);

    if (!report) {
      throw new Error("Report not found");
    }

    return report;
  }

  async updateReportStatus(
    reportId: string,
    userId: string,
    data: UpdateReportStatusData,
  ) {
    const user = await this.postReport.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "ADMIN") {
      throw new Error("Only admin can update reports");
    }

    const validatedData = updateReportStatusSchema.parse(data);

    const report = await this.postReport.findReportById(reportId);

    if (!report) {
      throw new Error("Report not found");
    }

    return this.postReport.updateReportStatus(reportId, validatedData);
  }
}
