import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.email().transform((value) => value.toLowerCase().trim()),

  phone: z.string().min(10).max(15).optional(),

  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.email().transform((value) => value.toLowerCase().trim()),

  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.email().transform((value) => value.toLowerCase().trim()),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),

  password: z.string().min(8),
});
