import { ProfessionalService } from "../services/professional.service";
import { updateProfessionalSchema } from "../validations/professional.validation";

const professionalService = new ProfessionalService();

export async function updateProfessional(userId: string, body: unknown) {
  const data = updateProfessionalSchema.parse(body);

  return professionalService.updateProfessional(userId, data);
}
