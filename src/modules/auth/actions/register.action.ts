"use server";

import { authService } from "../services/auth.service";
import {
  registerSchema,
  loginSchema,
  type RegisterInput,
  type LoginInput,
} from "../validations/auth.schema";
import type { AuthResponse } from "../types/auth.types";

export async function registerAction(input: unknown): Promise<AuthResponse> {
  try {
    // Validate input
    const validatedData = registerSchema.parse(input);

    // Register user
    const result = await authService.register(validatedData);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Validation failed",
        error: error.message,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
      error: "Unknown error",
    };
  }
}

export async function loginAction(input: unknown): Promise<AuthResponse> {
  try {
    // Validate input
    const validatedData = loginSchema.parse(input);

    // Login user
    const result = await authService.login(validatedData);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Validation failed",
        error: error.message,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
      error: "Unknown error",
    };
  }
}

export async function verifyTokenAction(token: string) {
  try {
    const payload = await authService.verifyToken(token);

    if (!payload) {
      return {
        success: false,
        message: "Invalid token",
      };
    }

    return {
      success: true,
      message: "Token is valid",
      payload,
    };
  } catch (error) {
    return {
      success: false,
      message: "Token verification failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
