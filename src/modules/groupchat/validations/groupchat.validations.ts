import { z } from "zod";

export const createGroupSchema = z.object({
  ownerId: z.cuid2({ message: "Invalid owner id" }),
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
  image: z.url({ message: "Invalid image URL" }).optional(),
});

export const addMemberSchema = z.object({
  userId: z.cuid2({ message: "Invalid user id" }),
});

export const CreateGroupMessage = z.object({
  groupId: z.cuid2({ message: "Invalid group id" }),
  senderId: z.cuid2({ message: "Invalid sender id" }),
  content: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(5000, "Message is too long"),
});

export const updateGroupSchema = z.object({
  name: z.string().trim().min(3).max(100).optional(),

  description: z.string().trim().max(500).optional(),

  image: z.url().optional(),
});

export const makeAdminSchema = z.object({
  isAdmin: z.boolean(),
});
