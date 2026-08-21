import { resetPasswordSchema } from "../validations/auth.schema";
import { AuthService } from "../services/auth.service";
import { ResetPasswordDto } from "../types/auth.types";

const authService = new AuthService();

export async function resetPasswordAction(input: ResetPasswordDto) {
  const data = resetPasswordSchema.parse(input);

  return authService.resetPassword(data.token, data.password);
}
