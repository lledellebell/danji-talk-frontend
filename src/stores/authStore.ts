import { create } from "zustand";
import Cookies from 'js-cookie';
import { kakaoLoginRequest } from '../api/api';
import { useNavigate } from 'react-router-dom';

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

interface KakaoAuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

interface AuthState {
  email: string;
  password: string;
  isLoggedIn: boolean;
  error: string | null;
  token: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => void;
  logout: () => void;
  setError: (error: string | null) => void;
  setToken: (token: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  isLoggedIn: false,
  error: null,
  token: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  login: () => set({ isLoggedIn: true, error: null }),
  logout: () => set({ 
    isLoggedIn: false, 
    email: '', 
    password: '', 
    error: null 
  }),
  setError: (error) => set({ error }),
  setToken: (token) => set({ token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
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
      }
    });
  };

  return handleKakaoLogin;
};

const handleKakaoLoginSuccess = async (authResponse: KakaoAuthResponse, navigate: ReturnType<typeof useNavigate>) => {
  try {
    const loginResponse = await kakaoLoginRequest({
      code: authResponse.access_token,
      redirectUri: window.location.origin
    });

    Cookies.set("token", loginResponse.data.token, { path: "/" });
    useAuthStore.getState().setToken(loginResponse.data.token);
    useAuthStore.getState().setIsLoggedIn(true);
    
    navigate('/home');
  } catch (error) {
    if (error instanceof Error) {
      useAuthStore.getState().setError(error.message);
    } else {
      useAuthStore.getState().setError('알 수 없는 오류가 발생했습니다.');
    }
  }
};