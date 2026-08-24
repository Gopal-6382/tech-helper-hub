import { VerificationService } from "../services/verification.service";
import { UpdateVerificationDto } from "../types/verification.types";

const verificationService = new VerificationService();

export async function updateVerification(
  userId: string,
  data: UpdateVerificationDto,
) {
  return verificationService.updateVerification(userId, data);
}
