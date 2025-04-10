import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useBoardData = (apartmentId: number, sort: string = 'ALL') => {
  return useQuery({
    queryKey: ['boardData', apartmentId, sort],
    queryFn: async () => {
      const response = await axios.get(`/api/community/feeds`, {
        params: {
          apartmentId,
          sort,
        },
      });
      if (response.data.code !== 200) {
        throw new Error(response.data.message || '데이터 조회 실패');
      }

      return response.data.data;
    },
    enabled: !!apartmentId,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};
