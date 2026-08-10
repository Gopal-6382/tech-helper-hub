import { NextRequest } from "next/server";
import { GroupChatService } from "@/modules/groupchat/services/groupchat.service";
import { JwtPayload } from "@/lib/auth";
const groupChatService = new GroupChatService();

export async function createGroup(
  req: NextRequest,
  userId: JwtPayload["userId"],
) {
  const { name, description, image } = await req.json();

  const result = await groupChatService.createGroup({
    ownerId: userId,
    name,
    description,
    image,
  });
  return result;
}
