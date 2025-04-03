import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useWithdrawalStore } from '../stores/withdrawalStore';

interface WithdrawalError {
  status: number;
  message: string;
}

export const useWithdrawalMutation = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { setError } = useWithdrawalStore();

  return useMutation({
    mutationFn: async (password: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/member`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const error: WithdrawalError = {
          status: response.status,
          message: response.status === 401 
            ? '비밀번호가 일치하지 않습니다.'
            : response.status === 403
            ? '진행중인 예약이 있어 탈퇴할 수 없습니다.'
            : '회원탈퇴 처리 중 오류가 발생했습니다.'
        };
        throw error;
      }

      return response;
    },
    onSuccess: () => {
      logout();
      navigate('/login', {
        replace: true,
        state: { message: '회원탈퇴가 완료되었습니다.' }
      });
    },
    onError: (error: unknown) => {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else if ((error as WithdrawalError).status) {
        setError((error as WithdrawalError).message);
      } else {
        setError('회원탈퇴 처리 중 오류가 발생했습니다.');
      }
    }
  });
}; 