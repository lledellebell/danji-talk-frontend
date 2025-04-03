import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface LoginResponse {
  token: string;
}

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { email: loginId, password, setError } = useAuthStore();
  const setIsAuthenticated = useAuthStore((state) => state.login);

  return useMutation<LoginResponse>({
    mutationFn: async () => {
      // 디버깅용 로그
      // console.log('로그인 시도:', { loginId, password });

      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ loginId, password })
      });

      // 디버깅용 로그
      // console.log('로그인 응답:', {
      //   status: response.status,
      //   statusText: response.statusText,
      //   headers: Object.fromEntries(response.headers.entries())
      // });

      if (!response.ok) {
        const errorText = await response.text();
        // 디버깅용 로그
        // console.error('로그인 에러 응답:', {
        //   status: response.status,
        //   text: errorText
        // });

        if (response.status === 401) {
          throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
        throw new Error(errorText || '로그인 중 오류가 발생했습니다.');
      }

      return { token: 'success' };
    },
    onSuccess: () => {
      setIsAuthenticated();
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