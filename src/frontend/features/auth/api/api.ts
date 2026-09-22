import { apiRequest } from "@/frontend/lib/api";

type AuthResponse<T> = T | undefined;

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type ForgotPasswordData = {
  email: string;
};

type ResetPasswordData = {
  token: string;
  password: string;
};

export const authService = {
  async login(data: LoginData) {
    const response = await apiRequest<AuthResponse<{ accessToken: string }>>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    return response.data;
  },

  async register(data: RegisterData) {
    const response = await apiRequest<AuthResponse<{ user?: unknown }>>(
      "/api/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    return response.data;
  },

  async forgotPassword(data: ForgotPasswordData) {
    const response = await apiRequest<AuthResponse<{ message?: string }>>(
      "/api/auth/forgot-password",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    return response.data;
  },

  async resetPassword(data: ResetPasswordData) {
    const response = await apiRequest<AuthResponse<{ message?: string }>>(
      "/api/auth/reset-password",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    return response.data;
  },

  async logout() {
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
  },

  async refreshToken() {
    const response = await apiRequest<AuthResponse<{ accessToken: string }>>(
      "/api/auth/refresh",
      {
        method: "POST",
      },
    );

    return response.data;
  },
};
