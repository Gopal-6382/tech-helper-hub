import { routeHandler } from "@/middleware/route.handler";
import { getParticipants } from "@/modules/directchat/actions/get-getParticipants";
import { USER_ROLES } from "@/constant/role.constant";

type ParticipantParams = {
  chatId: string;
};

export const GET = routeHandler<ParticipantParams>(
  async (_req, _user, { params }) => {
    const { chatId } = await params;

    if (!chatId) {
      throw new Error("chatId is required");
    }

    return getParticipants(chatId);
  },
  {
    roles: USER_ROLES,
  }
);