import { VerificationService } from "../services/verification.service";

const verificationService = new VerificationService();

export async function getVerification(userId: string) {
  return verificationService.getVerification(userId);
}
