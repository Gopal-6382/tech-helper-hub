import { useMutation, useQueryClient } from "@tanstack/react-query";

import { directChatApi } from "../api/direct-chat-api";
import { directChatKeys } from "./direct-chat-keys";

type SendMessageVariables = {
  chatId: string;
  content: string;
};

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId, content }: SendMessageVariables) =>
      directChatApi.sendMessage(chatId, content),

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
