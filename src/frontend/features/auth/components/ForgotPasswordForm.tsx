// src/frontend/components/auth/forgot-password-form.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/frontend/components/ui/field";

import { authService } from "@/features/auth/api/api";
import { forgotPasswordSchema } from "@/backend/modules/auth/validations/auth.schema";

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setMessage("");
    setServerError("");

    try {
      await authService.forgotPassword(values);

      setMessage("If the account exists, a password reset link has been sent.");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Request failed");
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Forgot password</h1>

      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Enter your email to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />

          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        {message && <p className="text-sm text-green-600">{message}</p>}
        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <Link
        href="/web/login"
        className="mt-4 block text-center text-sm text-primary hover:underline"
      >
        Back to login
      </Link>
    </div>
  );
}
