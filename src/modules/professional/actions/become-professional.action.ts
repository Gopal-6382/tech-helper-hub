import { ProfessionalService } from "../services/professional.service";
import { BecomeProfessionalDto } from "../types/professional.types";
import { becomeProfessionalSchema } from "../validations/professional.validation";

const professionalService = new ProfessionalService();

export async function becomeProfessional(userId: string, body: BecomeProfessionalDto) {
  const data = becomeProfessionalSchema.parse(body);

  return professionalService.becomeProfessional(userId, data);
}
