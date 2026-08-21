import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export async function logoutAction(userId: string) {
  return authService.logout(userId);
}
