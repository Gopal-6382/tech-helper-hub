import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../types/auth.types";
const authService = new AuthService();

export async function registerAction(data: RegisterUserDto) {
  return authService.register(data);
}
