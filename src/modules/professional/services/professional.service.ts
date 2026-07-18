import { ProfessionalRepository } from "../repositories/professional.repository";
import {
  BecomeProfessionalDto,
  UpdateProfessionalCategoriesDto,
  UpdateProfessionalDto,
} from "../types/professional.types";

export class ProfessionalService {
  private professionalRepository = new ProfessionalRepository();

  async becomeProfessional(userId: string, data: BecomeProfessionalDto) {
    const professional = await this.professionalRepository.findByUserId(userId);

    if (professional) {
      throw new Error("Professional profile already exists");
    }

    return this.professionalRepository.create(userId, data);
  }

  async getProfessional(userId: string) {
    const professional = await this.professionalRepository.findByUserId(userId);

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    return professional;
  }

  async updateProfessional(userId: string, data: UpdateProfessionalDto) {
    await this.getProfessional(userId);

    return this.professionalRepository.update(userId, data);
  }

  async updateAvailability(userId: string, isAvailable: boolean) {
    await this.getProfessional(userId);

    return this.professionalRepository.updateAvailability(userId, isAvailable);
  }
  async getCategories() {
    return this.professionalRepository.getCategories();
  }
  async updateCategories(
    userId: string,
    data: UpdateProfessionalCategoriesDto,
  ) {
    const professional = await this.getProfessional(userId);

    await this.professionalRepository.replaceCategories(
      professional.id,
      data.categoryIds,
    );

    return {
      success: true,
      message: "Categories updated successfully",
    };
  }

  async getDashboard(userId: string) {
    return this.getProfessional(userId);
  }
}
