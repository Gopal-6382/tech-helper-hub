import { useMutation, useQueryClient } from "@tanstack/react-query";

import { directChatApi } from "../api/direct-chat-api";
import { directChatKeys } from "./direct-chat-keys";

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (receiverId: string) =>
      directChatApi.createConversation(receiverId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: directChatKeys.conversations(),
      });
    },
  });
}
