import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddComment = () => {
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: async ({
      feedId,
      contents,
      parentId,
    }: {
      feedId: number;
      contents: string;
      parentId?: number;
    }) => {
      const response = await axios.post(
        `/api/community/feeds/${feedId}/comments`,
        {
          contents,
          parentId: parentId ?? '',
        }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['commentList', variables.feedId],
      });
    },
    onError: (error) => {
      alert('댓글 등록 중 오류가 발생했습니다.');
    },
  });

  return {
    addComment: addCommentMutation.mutate,
    isAdding: addCommentMutation.isPending,
  };
};
