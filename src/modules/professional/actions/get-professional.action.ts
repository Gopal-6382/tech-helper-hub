import { ProfessionalService } from "../services/professional.service";

const professionalService = new ProfessionalService();

export async function getProfessional(userId: string) {
  return professionalService.getProfessional(userId);
}