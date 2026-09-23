"use client";

import { useRouter } from "next/navigation";
import { authService } from "../api/api";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authService.logout();
    router.push("/web/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      Logout
    </button>
  );
}
