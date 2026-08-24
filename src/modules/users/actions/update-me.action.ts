import { UserService } from "../services/user.service";
import { UpdateMeDto } from "../types/user.types";

const userService = new UserService();

export async function updateMeAction(userId: string, data: UpdateMeDto) {
  return userService.updateMe(userId, data);
}
