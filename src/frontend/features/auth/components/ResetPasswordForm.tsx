// src/frontend/components/auth/reset-password-form.tsx

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { apiRequest } from "@/frontend/lib/api";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await apiRequest("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          password,
        }),
      });

      setMessage("Password reset successfully. You can now login.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Password reset failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Reset password</h1>

      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Create a new password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          required
          className="w-full rounded-md border px-3 py-2"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
          className="w-full rounded-md border px-3 py-2"
        />

        {message && <p className="text-sm text-green-600">{message}</p>}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>
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
