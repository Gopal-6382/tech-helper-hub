"use server";

import { ZodError } from "zod";
import { authService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validations/auth.schema";
import type { AuthResponse } from "../types/auth.types";

export async function registerAction(input: unknown): Promise<AuthResponse> {
  try {
    const validatedData = registerSchema.parse(input);

    return await authService.register(validatedData);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Validation failed",
        error: error.issues[0]?.message,
      };
    }

    return {
      success: false,
      message: "Registration failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function loginAction(input: unknown): Promise<AuthResponse> {
  try {
    const validatedData = loginSchema.parse(input);

    return await authService.login(validatedData);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Validation failed",
        error: error.issues[0]?.message,
      };
    }

    return {
      success: false,
      message: "Login failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
