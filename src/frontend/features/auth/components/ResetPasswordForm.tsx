// src/frontend/components/auth/reset-password-form.tsx

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/frontend/components/ui/field";

import { authService } from "@/features/auth/api/api";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    setMessage("");
    setServerError("");

    if (!token) {
      setServerError("Reset token is missing.");
      return;
    }

    try {
      await authService.resetPassword({
        token,
        password: values.password,
      });

      setMessage("Password reset successfully. You can now login.");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Password reset failed",
      );
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Reset password</h1>

      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Create a new password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">New password</FieldLabel>

          <Input
            id="password"
            type="password"
            placeholder="New password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />

          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>

          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>

        {message && <p className="text-sm text-green-600">{message}</p>}
        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Resetting..." : "Reset password"}
        </Button>
      </form>

      <Link
        href="/web/login"
        className="mt-4 block text-center text-sm text-primary hover:underline"
      >
        Go to login
      </Link>
    </div>
  );
}
