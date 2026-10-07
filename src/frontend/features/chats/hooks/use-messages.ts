import { useQuery } from "@tanstack/react-query";

import { directChatApi } from "../api/direct-chat-api";
import { directChatKeys } from "./direct-chat-keys";

export function useMessages(chatId: string) {
  return useQuery({
    queryKey: directChatKeys.messages(chatId),
    queryFn: () => directChatApi.getMessages(chatId),
    enabled: Boolean(chatId),

    // Check for updated readAt values.
    refetchInterval: 2000,

    // Refetch when the user comes back to the tab.
    refetchOnWindowFocus: true,
  });
}
