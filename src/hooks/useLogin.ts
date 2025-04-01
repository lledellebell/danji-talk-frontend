import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useLogin = () => {
  const { email, password, setEmail, setError, setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/login', {
        loginId: email,
        password: password
      }, {
        withCredentials: true
      });
      return response.data;
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      setEmail(email);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        setError(
          !error.response
            ? '네트워크 연결을 확인해주세요.'
            : error.response.data?.message || '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      }
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력하세요.');
      return;
    }
    setError(null);
    loginMutation.mutate();
  };

  return { handleLogin, isLoading: loginMutation.isPending };
};
