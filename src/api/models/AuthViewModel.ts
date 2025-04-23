import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { AxiosError } from 'axios';

// 로그인 요청 인터페이스
export interface LoginRequest {
  loginId: string;
  password: string;
}

// 로그인 응답 인터페이스
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

// 카카오 로그인 요청 인터페이스
export interface KakaoLoginRequest {
  code: string;
  redirectUri: string;
}

// 에러 메시지 매핑
const errorMessages = {
  401: '아이디 또는 비밀번호가 일치하지 않습니다',
  404: '존재하지 않는 계정입니다',
  429: '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  networkError: '인터넷 연결을 확인해주세요',
  default: '로그인 중 오류가 발생했습니다',
};

/**
 * 인증 관련 비즈니스 로직을 처리하는 ViewModel
 */
export class AuthViewModel {
  /**
   * 로그인 API 호출
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        request
      );
      
      // 로그인 성공 시 토큰 저장
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      
      return response.data;
    } catch (error: unknown) {
      // 에러 처리
      if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        const message = 
          errorMessages[status as keyof typeof errorMessages] || 
          error.response.data?.message || 
          errorMessages.default;
        
        throw new Error(message);
      }
      
      if (error instanceof AxiosError && error.request) {
        throw new Error(errorMessages.networkError);
      }
      
      throw new Error(errorMessages.default);
    }
  }
  
  /**
   * 카카오 로그인 API 호출
   */
  async kakaoLogin(request: KakaoLoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.KAKAO_LOGIN,
        request
      );
      
      // 로그인 성공 시 토큰 저장
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      
      return response.data;
    } catch (error: unknown) {
      // 에러 처리 로직
      if (error instanceof AxiosError && error.response) {
        const message = error.response.data?.message || errorMessages.default;
        throw new Error(message);
      }
      
      if (error instanceof AxiosError && error.request) {
        throw new Error(errorMessages.networkError);
      }
      
      throw new Error(errorMessages.default);
    }
  }
  
  /**
   * 로그아웃
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    // 필요에 따라 서버에 로그아웃 API 호출 가능
  }
  
  /**
   * 사용자가 로그인 상태인지 확인
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

// 싱글톤 인스턴스 제공
export const authViewModel = new AuthViewModel(); 