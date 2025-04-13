import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async ({
      feedId,
      commentId,
    }: {
      feedId: number;
      commentId: number;
    }) => {
      const response = await axios.delete(
        `/api/community/feeds/${feedId}/comments/${commentId}`
      );
      if (response.status !== 200 && response.status !== 204) {
        throw new Error('삭제 실패');
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    },
    onError: (error) => {
      console.log(error);
      alert('삭제 중 오류가 발생했습니다.');
    },
  });
  return {
    deleteComment: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
