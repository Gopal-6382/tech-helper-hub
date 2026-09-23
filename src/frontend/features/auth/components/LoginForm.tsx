// src/frontend/components/auth/login-form.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/frontend/components/ui/field";

import { authService } from "@/features/auth/api/api";
import { loginSchema } from "@/backend/modules/auth/validations/auth.schema";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError("");

    try {
      const result = await authService.login(values);

      if (result?.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
      }

      if (result?.refreshToken) {
        localStorage.setItem("refreshToken", result.refreshToken);
      }

      router.push("/web");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Login failed");
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Login</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to Tech Helper Hub
        </p>
      </div>

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

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            {...register("password")}
          />

          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <Link
          href="/web/forgot-password"
          className="text-primary hover:underline"
        >
          Forgot password?
        </Link>

        <Link href="/web/register" className="text-primary hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}
