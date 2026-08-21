import { forgotPasswordSchema } from "../validations/auth.schema";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export async function forgotPasswordAction(input: unknown) {
  const data = forgotPasswordSchema.parse(input);

  return authService.forgotPassword(data.email);
}
