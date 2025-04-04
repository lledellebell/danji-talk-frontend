import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBoardDetail = (feedId: number) => {
  return useQuery({
    queryKey: ['boardDetail', feedId],
    queryFn: async () => {
      const response = await axios.get(`/api/community/feeds/${feedId}`);
      return response.data;
    },
    enabled: !!feedId,
  });
};
