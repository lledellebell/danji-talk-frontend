import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: async (feedId: number) => {
      const response = await axios.delete(`/api/community/feeds/${feedId}`);
      if (response.status !== 200 && response.status !== 204) {
        throw new Error('삭제 실패');
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardData'] });
      navigate('/community');
    },
    onError: (error) => {
      console.log(error);
      alert('삭제 중 오류가 발생했습니다.');
    },
  });
  return {
    deleteBoard: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
