import { useQuery } from "@tanstack/react-query";

import { directChatApi } from "../api/direct-chat-api";
import { directChatKeys } from "./direct-chat-keys";

export function useConversation(chatId: string) {
  return useQuery({
    queryKey: directChatKeys.conversation(chatId),
    queryFn: () => directChatApi.getConversation(chatId),
    enabled: Boolean(chatId),
  });
}
