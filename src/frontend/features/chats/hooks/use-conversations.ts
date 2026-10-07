import { useQuery } from "@tanstack/react-query";

import { directChatApi } from "../api/direct-chat-api";
import { directChatKeys } from "./direct-chat-keys";

export function useConversations() {
  return useQuery({
    queryKey: directChatKeys.conversations(),
    queryFn: directChatApi.getConversations,
  });
}
