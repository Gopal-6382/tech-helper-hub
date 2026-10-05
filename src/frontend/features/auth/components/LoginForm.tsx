// src/frontend/components/auth/login-form.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authService } from "@/features/auth/api/api";
import { loginSchema } from "@/backend/modules/auth/validations/auth.schema";

import { useAuth } from "@/frontend/context/auth-context";
import { SubmitButton, TextField } from "@/frontend/components/form";

type LoginFormValues = z.input<typeof loginSchema>;
type LoginFormOutput = z.output<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormOutput) => {
    setServerError(null);

    try {
      const result = await authService.login(data);

      if (!result?.accessToken || !result?.refreshToken || !result?.user) {
        throw new Error("Invalid login response.");
      }

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      login(result.user);

      router.push("/web");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Login failed.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold">Login</h1>

        <p className="text-sm text-muted-foreground">
          Sign in to Tech Helper Hub
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <TextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <TextField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />

        {serverError && (
          <p role="alert" className="text-sm text-destructive">
            {serverError}
          </p>
        )}

        <SubmitButton
          isSubmitting={form.formState.isSubmitting}
          loadingText="Logging in..."
          className="w-full"
        >
          Login
        </SubmitButton>
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
