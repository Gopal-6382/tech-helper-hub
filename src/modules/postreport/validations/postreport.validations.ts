import { z } from "zod";
import { ReportStatus } from "@prisma/client";

export const createReportSchema = z
  .object({
    postId: z.string().uuid("Invalid post id").optional(),
    commentId: z.string().uuid("Invalid comment id").optional(),
    reason: z
      .string()
      .trim()
      .min(3, "Reason must be at least 3 characters")
      .max(500, "Reason must not exceed 500 characters"),
  })
  .refine((data) => Boolean(data.postId) !== Boolean(data.commentId), {
    message: "Either postId or commentId must be provided, but not both",
  });

export const updateReportStatusSchema = z.object({
  status: z.enum([
    ReportStatus.PENDING,
    ReportStatus.REVIEWED,
    ReportStatus.DISMISSED,
    ReportStatus.ACTION_TAKEN,
  ]),
});
