import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export async function refreshAction(refreshToken: string) {
  return authService.refresh(refreshToken);
}
