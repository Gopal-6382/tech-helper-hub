import { NextRequest } from "next/server";
import { GroupChatService } from "@/modules/groupchat/services/groupchat.service";

const groupChatService = new GroupChatService();

export async function getGroup(req: NextRequest) {
  const { groupId, userId } = await req.json();

  const result = await groupChatService.getGroup(groupId, userId);

  return result;
}
