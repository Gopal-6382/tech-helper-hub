// src/frontend/components/auth/register-form.tsx

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
import { registerSchema } from "@/backend/modules/auth/validations/auth.schema";

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setServerError("");

    try {
      await authService.register(values);
      router.push("/web/login");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Create account</h1>

      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Join Tech Helper Hub
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Full name</FieldLabel>

          <Input
            id="name"
            placeholder="Full name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />

          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <Input
            id="email"
            type="email"
            placeholder="Email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />

          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.phone}>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>

          <Input
            id="phone"
            type="tel"
            placeholder="Phone"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />

          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
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
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/web/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
