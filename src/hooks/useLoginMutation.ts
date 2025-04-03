import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface LoginResponse {
  token: string;
}

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { email: loginId, password, setError } = useAuthStore();

  return useMutation<LoginResponse>({
    mutationFn: async () => {
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ loginId, password })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
        throw new Error('로그인 중 오류가 발생했습니다.');
      }

      // 응답이 비어있으므로 토큰은 쿠키에서 처리됨
      return {} as LoginResponse;
    },
    onSuccess: () => {
      // 토큰이 쿠키로 설정되므로 별도 처리 불필요
      navigate('/', { replace: true });
    },
    onError: (error: Error) => {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setError(error.message);
      }
    }
  });
}; 