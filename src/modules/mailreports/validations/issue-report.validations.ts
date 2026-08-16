import { z } from "zod";

export const createIssueReportSchema = z.object({
  category: z.enum([
    "BUG",
    "PAYMENT",
    "ACCOUNT",
    "BOOKING",
    "CHAT",
    "CONTENT",
    "UI",
    "OTHER",
  ]),

  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title is too long"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description is too long"),

  rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional(),

  pageUrl: z
    .string()
    .url()
    .optional(),
});