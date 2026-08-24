import { ProfessionalService } from "../services/professional.service";

const professionalService = new ProfessionalService();

export async function updateAvailability(userId: string, isAvailable: boolean) {

  return professionalService.updateAvailability(userId, isAvailable);
}