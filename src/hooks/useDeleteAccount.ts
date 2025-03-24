import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

export const useDeleteAccount = () => {
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await axios.delete(`${API_URL}/api/member`, {
        data: { password },
      });
      return response.data;
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('탈퇴에 실패했습니다. 비밀번호를 확인해주세요.');
    },
  });

  return {
    deleteAccount: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
