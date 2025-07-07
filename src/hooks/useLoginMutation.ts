import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import api from '../api/axios';
import axios from 'axios';

interface LoginResponse {
  token: string;
}

const errorMessages = {
  401: '아이디 또는 비밀번호가 일치하지 않습니다',
  404: '존재하지 않는 계정입니다',
  429: '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  networkError: '인터넷 연결을 확인해주세요',
  default: '로그인 중 오류가 발생했습니다',
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { email: loginId, password, setError } = useAuthStore();
  const setIsAuthenticated = useAuthStore((state) => state.login);

  return useMutation<LoginResponse>({
    mutationFn: async () => {
      try {
        const response = await fetch(`/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ loginId, password }),
        });

        if (response.status === 200) {
          return response.data;
        }

        throw new Error(errorMessages.default);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && errorMessages[status as keyof typeof errorMessages]) {
            throw new Error(errorMessages[status as keyof typeof errorMessages]);
          } else if (error.request) {
            throw new Error(errorMessages.networkError);
          }
        } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
          throw new Error(errorMessages.networkError);
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      login();
      navigate('/', { replace: true });
    },
    onError: (error: Error) => {
      setError(error.message);
      useAuthStore.getState().setPassword('');

      setTimeout(() => {
        if (loginId && password) {
          document.getElementById('password')?.focus();
        } else if (!loginId) {
          document.getElementById('email')?.focus();
        } else {
          document.getElementById('password')?.focus();
        }
      }, 100);
    },
  });
};
