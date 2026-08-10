import { GroupChatService } from "@/modules/groupchat/services/groupchat.service";
const groupChatService = new GroupChatService();

export async function getGroup(userId: string) {

  const result = await groupChatService.getMyGroups(userId);

  return result;
}
