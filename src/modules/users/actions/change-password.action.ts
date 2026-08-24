import { UserService } from "../services/user.service";
import { ChangePasswordDto } from "../types/user.types";

const userService = new UserService();

export async function changePasswordAction(
  userId: string,
  data: ChangePasswordDto,
) {
  return userService.changePassword(userId, data);
}
