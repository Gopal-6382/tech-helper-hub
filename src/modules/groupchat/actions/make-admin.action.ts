import { GroupChatService } from "../services/groupchat.service";
const groupChatService = new GroupChatService();

export async function makeAdmin(
  groupId: string,
  requesterId:string,
  userId: string,
) {
  return groupChatService.makeAdmin(
    groupId,
    requesterId,
    userId
  );
}
