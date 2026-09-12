import { GroupChatService } from "@/modules/groupchat/services/groupchat.service";
import { CreateGroupDto } from "../types/groupchat.types";
const groupChatService = new GroupChatService();

export async function createGroup(userId: string, data: CreateGroupDto) {
  return groupChatService.createGroup({
    ownerId: userId,
    ...data,
  });
}
