import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useLogin = () => {
  const { username, password, setUsername, setError, setIsLoggedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력하세요.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/users`);
      const users = response.data;
      
      const userExists = users.find((u: User) => u.username === username);
      if (!userExists) {
        setError('아이디가 올바르지 않습니다. 다시 확인해주세요.');
        return;
      }
      
      const user = users.find((u: User) => 
        u.username === username && u.password === password
      );

      if (user) {
        setIsLoggedIn(true);
        setUsername(username);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        setError(!error.response 
          ? '네트워크 연결을 확인해주세요.' 
          : '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
}; 