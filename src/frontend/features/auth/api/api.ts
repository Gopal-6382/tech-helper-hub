import { apiRequest } from "@/frontend/lib/api";

type AuthResponse<T> = T | undefined;

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type ForgotPasswordData = {
  email: string;
};

type ResetPasswordData = {
  token: string;
  password: string;
};

type LoginResponseData = {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export const authService = {
  async login(data: LoginData) {
    const response = await apiRequest<AuthResponse<LoginResponseData>>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    return response.data;
  },

  async register(data: RegisterData) {
    const response = await apiRequest<AuthResponse<{ message?: string }>>(
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

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await apiRequest<AuthResponse<{ accessToken: string }>>(
      "/api/auth/refresh",
      {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      },
    );

    return response.data;
  },

  async logout() {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await apiRequest("/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
};
