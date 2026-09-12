import { VerificationRepository } from "../repositories/verification.repository";

import {
  CreateVerificationDto,
  UpdateVerificationDto,
} from "../types/verification.types";

export class VerificationService {
  private verificationRepository = new VerificationRepository();

  async uploadVerification(userId: string, data: CreateVerificationDto) {
    const verification = await this.verificationRepository.findByUserId(userId);

    if (verification) {
      throw new Error("Verification already submitted");
    }

    return this.verificationRepository.create(userId, data);
  }

  async getVerification(userId: string) {
    const verification = await this.verificationRepository.findByUserId(userId);

    if (!verification) {
      throw new Error("Verification not found");
    }

    return verification;
  }

  async updateVerification(userId: string, data: UpdateVerificationDto) {
    await this.getVerification(userId);

    return this.verificationRepository.update(userId, data);
  }
}
