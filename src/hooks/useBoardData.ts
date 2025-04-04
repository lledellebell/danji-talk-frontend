import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useBoardData = (apartmentId: number) => {
  return useQuery({
    queryKey: ['boardData', apartmentId],
    queryFn: async () => {
      const response = await axios.get(`/api/community/feeds`, {
        params: {
          apartmentId,
          LocalDateTime: new Date().toISOString(),
        },
      });
      if (response.data.code !== 200) {
        throw new Error(response.data.message || '데이터 조회 실패');
      }

      return response.data.data;
    },
    enabled: !!apartmentId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
