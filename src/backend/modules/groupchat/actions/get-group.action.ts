import { GroupChatService } from "@/modules/groupchat/services/groupchat.service";

const groupChatService = new GroupChatService();

export async function getGroup(groupId: string, userId: string) {
  return groupChatService.getGroup(groupId, userId);
}
