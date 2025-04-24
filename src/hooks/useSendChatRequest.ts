import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatKeys } from '../services/chatService';

interface SendChatRequestParams {
  receiverId: number;
  message: string;
}

export const useSendChatRequest = () => {
  const sendChatRequestMutation = useMutation({
    mutationFn: async ({ receiverId, message }: SendChatRequestParams) => {
      const response = await axios.post(`/api/chat/request`, {
        receiverId,
        message,
      });
      return response.data;
    },
    onSuccess: () => {},
    onError: () => {
      alert('채팅 요청 중 오류가 발생했습니다.');
    },
  });

  return {
    sendChatRequest: sendChatRequestMutation.mutate,
    isSending: sendChatRequestMutation.isPending,
  };
};
