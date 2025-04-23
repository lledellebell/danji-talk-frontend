import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authViewModel, LoginRequest, KakaoLoginRequest } from '../models/AuthViewModel';
import { useAuthStore } from '../../stores/authStore';

/**
 * 로그인 기능을 위한 커스텀 훅
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setError } = useAuthStore();
  const setIsAuthenticated = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async ({ loginId, password }: LoginRequest) => {
      return authViewModel.login({ loginId, password });
    },
    onSuccess: () => {
      // 인증 상태 업데이트
      setIsAuthenticated();
      
      // 필요한 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // 홈으로 리다이렉트
      navigate('/', { replace: true });
    },
    onError: (error: Error) => {
      // 에러 메시지 설정
      setError(error.message);
      
      // 비밀번호 입력 초기화
      useAuthStore.getState().setPassword('');

      // 포커스 처리
      setTimeout(() => {
        const loginId = useAuthStore.getState().email;
        const password = useAuthStore.getState().password;
        
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

/**
 * 카카오 로그인 기능을 위한 커스텀 훅
 */
export const useKakaoLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setError } = useAuthStore();
  const setIsAuthenticated = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async ({ code, redirectUri }: KakaoLoginRequest) => {
      return authViewModel.kakaoLogin({ code, redirectUri });
    },
    onSuccess: () => {
      // 인증 상태 업데이트
      setIsAuthenticated();
      
      // 필요한 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // 홈으로 리다이렉트
      navigate('/', { replace: true });
    },
    onError: (error: Error) => {
      // 에러 메시지 설정
      setError(error.message);
    },
  });
};

/**
 * 로그아웃 기능을 위한 커스텀 훅
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setIsLoggedOut = useAuthStore((state) => state.logout);

  return {
    logout: () => {
      // ViewModel의 로그아웃 메서드 호출
      authViewModel.logout();
      
      // 상태 업데이트
      setIsLoggedOut();
      
      // 캐시 데이터 초기화
      queryClient.clear();
      
      // 로그인 페이지로 리다이렉트
      navigate('/login', { replace: true });
    },
  };
};

/**
 * 인증 상태 확인을 위한 훅
 */
export const useAuthCheck = () => {
  return {
    isAuthenticated: authViewModel.isAuthenticated(),
  };
}; 