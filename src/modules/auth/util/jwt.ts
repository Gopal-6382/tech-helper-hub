import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "@prisma/client";
export type JwtPayload = {
  userId: string;
  role: Role;
};
//Get the access secerete token
function getAccessSecret(): string {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not configured");
  }

  return secret;
}
//get the refresh secret token
function getRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not configured");
  }

  return secret;
}
//Generate the access token
export function generateAccessToken(userId: string, role: string): string {
  return jwt.sign(
    {
      userId,
      role,
    },
    getAccessSecret(),
    {
      expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ||
        "15m") as SignOptions["expiresIn"],
    },
  );
}
//Generate the refresh token
export function generateRefreshToken(userId: string, role: string): string {
  return jwt.sign(
    {
      userId,
      role,
    },
    getRefreshSecret(),
    {
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ||
        "7d") as SignOptions["expiresIn"],
    },
  );
}
//Verify the access token
export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, getAccessSecret()) as JwtPayload;
}
//Verify the refresh token
export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, getRefreshSecret()) as JwtPayload;
}
