import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

export interface JwtPayload {
  userId: string;
  role: Role;
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload;
}
