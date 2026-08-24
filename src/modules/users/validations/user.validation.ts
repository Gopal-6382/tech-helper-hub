import { z } from "zod";

export const updateMeSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters")
      .optional(),

    phone: z
      .string()
      .trim()
      .min(7, "Invalid phone number")
      .max(20, "Invalid phone number")
      .nullable()
      .optional(),

    avatar: z.url("Invalid avatar URL").nullable().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided",
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
export const deleteUserSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});
