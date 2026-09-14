// src/services/auth.service.ts
import api from "@/"; // Your configured axios or fetch instance

export const authService = {
  async login(data: { email: string; password: string }) {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  async forgotPassword(data: { email: string }) {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  },

  async resetPassword(data: { token: string; password: string }) {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },

  async logout() {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  async refreshToken() {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};
