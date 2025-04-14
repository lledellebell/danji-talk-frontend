import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useEditComment = () => {
  const queryClient = useQueryClient();

  const editCommentMutaion = useMutation({
    mutationFn: async ({
      feedId,
      commentId,
      contents,
    }: {
      feedId: number;
      commentId: number;
      contents: string;
    }) => {
      const response = await axios.put(
        `/api/community/feeds/${feedId}/comments/${commentId}`,
        { contents }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['commentList', variables.feedId],
      });
    },
    onError: (error) => {
      alert('댓글 수정 중 오류가 발생했습니다.');
    },
  });

  return {
    editComment: editCommentMutaion.mutate,
    isAdding: editCommentMutaion.isPending,
  };
};
