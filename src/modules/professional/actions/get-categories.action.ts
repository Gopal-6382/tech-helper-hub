import { ProfessionalService } from "../services/professional.service";

const professionalService = new ProfessionalService();

export async function getCategories() {
  return professionalService.getCategories();
}


