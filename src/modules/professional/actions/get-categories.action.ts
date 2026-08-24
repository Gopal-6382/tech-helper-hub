import { ProfessionalService } from "../services/professional.service";
import { updateProfessionalCategoriesSchema } from "../validations/professional.validation";

const professionalService = new ProfessionalService();

export async function getCategories() {
  return professionalService.getCategories();
}

export async function updateCategories(userId: string, body: unknown) {
  const data = updateProfessionalCategoriesSchema.parse(body);

  return professionalService.updateCategories(userId, data);
}
