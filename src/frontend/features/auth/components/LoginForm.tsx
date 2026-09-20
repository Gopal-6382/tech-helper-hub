"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { apiRequest } from "@/frontend/features/posts/services/api";

type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await apiRequest<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (result.data?.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
      }

      if (result.data?.refreshToken) {
        localStorage.setItem("refreshToken", result.data.refreshToken);
      }

      router.push("/web");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
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
