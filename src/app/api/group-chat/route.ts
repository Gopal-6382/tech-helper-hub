import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";
import { CreateGroupDto } from "@/modules/groupchat/types/groupchat.types";
import { createGroup } from "@/modules/groupchat/actions/create-group.action";

export const POST = authMiddleware(async (req: NextRequest, user) => {
  return handleRequest(async () => {
    const body: CreateGroupDto = await req.json();

    return createGroup(user.userId, body);
  });
});
