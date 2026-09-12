import { UserService } from "../services/user.service";

const userService = new UserService();

export async function activateMeAction(userId: string) {
  return userService.activateMeAction(userId);
}
