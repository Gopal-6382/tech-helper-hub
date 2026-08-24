import { routeHandler } from "@/middleware/route.handler";
import { createConversation } from "@/modules/directchat/actions/create-chat.action";
import { CreateConversationDto } from "@/modules/directchat/types/direct-chat.types";
import { USER_ROLES } from "@/constant/role.constant";
import { createConversationSchema } from "@/modules/directchat/validations/direct-chat.validation";

export const POST = routeHandler(
  async (req, user) => {
    const body: CreateConversationDto = await req.json();
const data = createConversationSchema.parse(body);
    // Directly return the action; routeHandler wraps it in successResponse automatically
    return createConversation(user.userId, data);
  },
  {
    roles: USER_ROLES,
  }
);