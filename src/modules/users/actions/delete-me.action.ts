import { UserService } from "../services/user.service";
import {} from "../validations/user.validation";
import { DeleteUserDto } from "../types/user.types";

const userService = new UserService();

export async function deleteMeAction(userId: string, data: DeleteUserDto) {
  return userService.deleteMe(userId, data.password);
}
