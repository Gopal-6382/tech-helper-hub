import { useQuery } from "@tanstack/react-query";

import { directChatApi } from "../api/direct-chat-api";
import { directChatKeys } from "./direct-chat-keys";

export function useParticipants(chatId: string) {
  return useQuery({
    queryKey: directChatKeys.participants(chatId),
    queryFn: () => directChatApi.getParticipants(chatId),
    enabled: Boolean(chatId),
  });
}
