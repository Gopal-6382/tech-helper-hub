import { User } from "@/constant/roles.route.const";
import { routeHandler } from "@/middleware/route.handler";
import { getParticipants } from "@/modules/directchat/actions/get-getParticipants";

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
  User,
);
