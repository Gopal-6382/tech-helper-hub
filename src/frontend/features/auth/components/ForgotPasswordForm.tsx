// src/frontend/components/auth/forgot-password-form.tsx

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { apiRequest } from "@/frontend/features/posts/services/api";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await apiRequest("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setMessage("If the account exists, a password reset link has been sent.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Forgot password</h1>

      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Enter your email to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
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
          {loading ? "Sending..." : "Send reset link"}
        </button>
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
