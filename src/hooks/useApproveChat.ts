import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatKeys } from '../services/chatService';

export const useApproveChat = () => {
  const queryClient = useQueryClient();

  const approveChatMutation = useMutation({
    mutationFn: async ({ requestId }: { requestId: string }) => {
      const response = await axios.post(
        `/api/chat/request/${requestId}/approve`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.directResponse(),
      });
    },
    onError: () => {
      alert('채팅 승인 중 오류가 발생했습니다.');
    },
  });

  return {
    approveChat: approveChatMutation.mutate,
    isApproving: approveChatMutation.isPending,
  };
};
