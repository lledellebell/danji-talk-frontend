import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatKeys } from '../services/chatService';

export const useRejectChat = () => {
  const queryClient = useQueryClient();

  const rejectChatMutation = useMutation({
    mutationFn: async ({ requestId }: { requestId: string }) => {
      const response = await axios.post(
        `/api/chat/request/${requestId}/reject`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.directResponse(),
      });
    },
    onError: () => {
      alert('채팅 거절 중 오류가 발생했습니다.');
    },
  });

  return {
    rejectChat: rejectChatMutation.mutate,
    isRejecting: rejectChatMutation.isPending,
  };
};
