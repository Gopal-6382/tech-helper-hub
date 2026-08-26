import { UserService } from "../services/user.service";

const userService = new UserService();

export async function deactivateMeAction(userId: string) {
  return userService.deactivateMeAction(userId);
}
