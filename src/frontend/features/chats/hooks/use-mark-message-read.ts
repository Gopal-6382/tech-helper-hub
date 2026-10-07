import { useMutation, useQueryClient } from "@tanstack/react-query";

import { directChatApi } from "../api/direct-chat-api";
import { directChatKeys } from "./direct-chat-keys";

type MarkMessageReadVariables = {
  messageId: string;
  chatId: string;
};

export function useMarkMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId }: MarkMessageReadVariables) =>
      directChatApi.markMessageRead(messageId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: directChatKeys.messages(variables.chatId),
      });

      queryClient.invalidateQueries({
        queryKey: directChatKeys.conversations(),
      });
    },
  });
}
