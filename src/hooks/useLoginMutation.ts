import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { API_ENDPOINTS } from '../api/endpoints';
import axios from 'axios';

interface LoginResponse {
  token: string;
}

const errorMessages: { [key: number]: string } & { default: string; networkError: string } = {
  401: '아이디 또는 비밀번호가 일치하지 않습니다',
  404: '존재하지 않는 계정입니다',
  429: '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  networkError: '인터넷 연결을 확인해주세요',
  default: '로그인 중 오류가 발생했습니다',
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { email: loginId, password, setError, login } = useAuthStore();

  return useMutation<LoginResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `/api${API_ENDPOINTS.AUTH.LOGIN}`,
          { loginId, password },
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && errorMessages[status]) {
            throw new Error(errorMessages[status]);
          } else if (error.request) {
            throw new Error(errorMessages.networkError);
          }
        }
        throw new Error(errorMessages.default);
      }
    },
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem('auth_token', data.token);
      }
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
