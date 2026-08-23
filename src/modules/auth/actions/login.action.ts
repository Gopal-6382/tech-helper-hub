import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../types/auth.types";

const authService = new AuthService();

export async function loginAction(data: LoginUserDto) {
  return authService.login(data);
}
