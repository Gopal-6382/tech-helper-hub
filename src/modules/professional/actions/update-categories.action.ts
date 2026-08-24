import { ProfessionalService } from "../services/professional.service";
import { UpdateProfessionalCategoriesDto } from "../types/professional.types";

const professionalService = new ProfessionalService();

export async function updateCategories( user: string ,body: UpdateProfessionalCategoriesDto) {


  return await professionalService.updateCategories(user, body);

}
