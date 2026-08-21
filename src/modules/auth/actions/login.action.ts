import { loginSchema } from "../validations/auth.schema";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../types/auth.types";

const authService = new AuthService();

export async function loginAction(input: LoginUserDto) {
  const data = loginSchema.parse(input);

  return authService.login(data);
}
