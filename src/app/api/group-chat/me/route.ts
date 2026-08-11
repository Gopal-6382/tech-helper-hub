import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/auth.middleware";
import { handleRequest } from "@/utils/api.helper";
import { getGroup } from "@/modules/groupchat/actions/get-my-groups.action";

export const GET = authMiddleware(async (req: NextRequest, user) => {
  return handleRequest(async () => {
    return getGroup(user.userId);
  });
});
