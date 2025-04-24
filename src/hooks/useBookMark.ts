import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const useBookMark = (feedId: number) => {
  const postBookMarkMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `/api/community/feeds/${feedId}/bookmarks`
      );
      return response.data;
    },
    onSuccess: () => {
      // 북마크 등록 성공
    },
    onError: () => {
      // 에러 처리
    },
  });

  const deleteBookMarkMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `/api/community/feeds/${feedId}/bookmarks`
      );
      return response.data;
    },
    onSuccess: () => {
      // 북마크 해제 성공
    },
    onError: () => {
      // 에러 처리
    },
  });

  return {
    postBookMark: postBookMarkMutation.mutate,
    isPostingBookMark: postBookMarkMutation.isPending,
    deleteBookMark: deleteBookMarkMutation.mutate,
    isDeletingBookMark: deleteBookMarkMutation.isPending,
  };
};
