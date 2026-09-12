import { AuthService } from "../services/auth.service";
import { ResetPasswordDto } from "../types/auth.types";

const authService = new AuthService();

export async function resetPasswordAction(data: ResetPasswordDto) {
  return authService.resetPassword(data.token, data.password);
}
