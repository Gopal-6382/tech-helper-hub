import { ProfessionalService } from "../services/professional.service";

const professionalService = new ProfessionalService();

export async function getDashboard(userId: string) {
  return professionalService.getDashboard(userId);
}
