import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCommentList = (feedId: number, page = 0, size = 1000) => {
  return useQuery({
    queryKey: ['commentList', feedId, page, size],
    queryFn: async () => {
      const params = {
        page,
        size,
      };
      const response = await axios.get(
        `/api/community/feeds/${feedId}/comments`,
        { params }
      );
      return response.data.data;
    },
    enabled: !!feedId,
  });
};
