import { z } from "zod";

export const createGroupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Group name must be at least 3 characters")
    .max(100, "Group name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  image: z.string().url({ message: "Invalid image URL" }).optional(),
});

export const addMemberSchema = z.object({
  userId: z.string().uuid({ message: "Invalid user id" }),
});

export const sendGroupMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(5000, "Message is too long"),
});

export const makeAdminSchema = z.object({
  isAdmin: z.boolean(),
});
