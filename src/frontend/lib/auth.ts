// src/frontend/lib/auth.ts

import { apiRequest } from "./api";

export async function logout() {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    await apiRequest("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({
        refreshToken,
      }),
    });
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
