import { useMutation, useQueryClient } from "@tanstack/react-query";

import { directChatApi } from "../api/direct-chat-api";
import { directChatKeys } from "./direct-chat-keys";

type DeleteMessageVariables = {
  messageId: string;
  chatId: string;
};

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId }: DeleteMessageVariables) =>
      directChatApi.deleteMessage(messageId),

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
