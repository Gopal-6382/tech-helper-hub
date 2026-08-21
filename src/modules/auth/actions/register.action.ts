import { registerSchema } from "../validations/auth.schema";
import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../types/auth.types";
const authService = new AuthService();

export async function registerAction(input: RegisterUserDto) {
  const data = registerSchema.parse(input);

  return authService.register(data);
}
