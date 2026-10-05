import { apiRequest } from "@/frontend/lib/api";

import type {
  CreateReportData,
  Report,
  ReportStatus,
} from "@/features/posts/types/report.types";

export const reportApi = {
  async createReport(data: CreateReportData): Promise<Report> {
    const response = await apiRequest<Report>("/api/reports", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.data) {
      throw new Error("Failed to create report");
    }

    return response.data;
  },

  async getMyReports(): Promise<Report[]> {
    const response = await apiRequest<Report[]>("/api/reports/my");

    return response.data ?? [];
  },

  async getReport(reportId: string): Promise<Report> {
    const response = await apiRequest<Report>(`/api/reports/${reportId}`);

    if (!response.data) {
      throw new Error("Report not found");
    }

    return response.data;
  },

  async getReports(): Promise<Report[]> {
    const response = await apiRequest<Report[]>("/api/reports");

    return response.data ?? [];
  },

  async updateReportStatus(
    reportId: string,
    status: ReportStatus,
  ): Promise<Report> {
    const response = await apiRequest<Report>(`/api/reports/${reportId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    if (!response.data) {
      throw new Error("Failed to update report");
    }

    return response.data;
  },
};
