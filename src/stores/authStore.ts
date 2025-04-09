import { create } from 'zustand';
import Cookies from 'js-cookie';
import { kakaoLoginRequest } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { KakaoAuthResponse } from '../types/kakao';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (response: KakaoAuthResponse) => void;
          fail: (error: Error) => void;
        }) => void;
      };
    };
  }
}

interface AuthState {
  isLoggedIn: boolean;
  email: string;
  password: string;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setError: (error: string | null) => void;
  resetAuth: () => void;
  login: () => void;
  logout: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  email: '',
  password: '',
  error: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setError: (error) => set({ error }),
  resetAuth: () => set({ email: '', password: '', error: null }),
  login: () => {
    localStorage.setItem('isLoggedIn', 'true');
    set({ isLoggedIn: true, error: null });
  },
  logout: () => {
    localStorage.removeItem('isLoggedIn');
    set({ isLoggedIn: false, email: '', password: '' });
  },
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    if (!window.Kakao?.Auth) {
      console.error('Kakao SDK가 로드되지 않았거나 Auth 속성이 없습니다.');
      return;
    }

    window.Kakao.Auth.login({
      success: async (response: KakaoAuthResponse) => {
        await handleKakaoLoginSuccess(response, navigate);
      },
      fail: (error: Error) => {
        console.error('카카오 로그인 실패:', error);
      },
    });
  };

  return handleKakaoLogin;
};

const handleKakaoLoginSuccess = async (
  authResponse: KakaoAuthResponse,
  navigate: ReturnType<typeof useNavigate>
) => {
  try {
    const loginResponse = await kakaoLoginRequest({
      code: authResponse.access_token,
      redirectUri: window.location.origin,
    });

    Cookies.set('token', loginResponse.data.token, { path: '/' });
    useAuthStore.getState().login();

    navigate('/home');
  } catch (error) {
    if (error instanceof Error) {
      useAuthStore.getState().setError(error.message);
    } else {
      useAuthStore.getState().setError('알 수 없는 오류가 발생했습니다.');
    }
  }
};
