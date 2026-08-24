import { VerificationService } from "../services/verification.service";
import { CreateVerificationDto } from "../types/verification.types";

const verificationService = new VerificationService();

export async function uploadVerification(
  userId: string,
  data: CreateVerificationDto,
) {
  return verificationService.uploadVerification(userId, data);
}
