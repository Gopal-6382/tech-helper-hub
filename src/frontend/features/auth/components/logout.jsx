"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/frontend/lib/auth";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return <button onClick={handleLogout}>Logout</button>;
}
