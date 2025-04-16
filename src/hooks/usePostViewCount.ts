import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const usePostViewCount = () => {
  const viewCountMutaion = useMutation({
    mutationFn: async (feedId: number) => {
      const res = await axios.post(`/api/community/feeds/${feedId}/view`);
      return res.data;
    },
    onSuccess: () => {},
    onError: () => {},
  });

  return { postViewCount: viewCountMutaion.mutate };
};
