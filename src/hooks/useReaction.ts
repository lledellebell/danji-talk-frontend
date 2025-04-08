import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const useReaction = (feedId: number) => {
  const postReactionMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/community/${feedId}/reactions`);
      return response.data;
    },
    onSuccess: () => {},
    onError: (error) => {},
  });

  const deleteReactionMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/community/${feedId}/reactions`);
      return response.data;
    },
    onSuccess: () => {
      // 취소 성공 후 처리
    },
    onError: (error) => {
      // 취소 에러 처리
    },
  });

  return {
    postReaction: postReactionMutation.mutate,
    isPosting: postReactionMutation.isPending,
    deleteReaction: deleteReactionMutation.mutate,
    isDeleting: deleteReactionMutation.isPending,
  };
};
