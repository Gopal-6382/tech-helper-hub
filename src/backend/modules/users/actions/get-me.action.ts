import { UserService } from "../services/user.service";

const userService = new UserService();

export async function getMeAction(userId: string) {
  return userService.getMe(userId);
}
