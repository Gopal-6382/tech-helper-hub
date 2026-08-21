import crypto from "crypto";

//we generate a random token
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
//we hash the token
export function hashResetToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
