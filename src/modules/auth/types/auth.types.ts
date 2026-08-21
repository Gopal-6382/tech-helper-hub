import { Role } from "@prisma/client";

export type RegisterUserDto = {
  name: string;
  email: string;
  phone?: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type ResetPasswordDto = {
  token: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
