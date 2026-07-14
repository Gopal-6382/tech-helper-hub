export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "PROFESSIONAL" | "ADMIN";
  avatar?: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
}