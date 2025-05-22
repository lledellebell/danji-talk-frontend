import { apiClient } from '../../../api/client';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { AxiosError } from 'axios';
import { 
  LoginRequest, 
  LoginResponse, 
  KakaoLoginRequest,
  RegisterRequest,
  RegisterResponse,
  EmailVerificationResponse
} from '../types';

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
 * localStorage 사용 가능 여부 확인
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 안전한 localStorage 접근
 */
const safeLocalStorage = {
  setItem: (key: string, value: string): void => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('localStorage 저장 실패:', e);
      }
    }
  },
  getItem: (key: string): string | null => {
    if (isLocalStorageAvailable()) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('localStorage 읽기 실패:', e);
        return null;
      }
    }
    return null;
  },
  removeItem: (key: string): void => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('localStorage 삭제 실패:', e);
      }
    }
  }
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
        safeLocalStorage.setItem('auth_token', response.data.token);
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
        safeLocalStorage.setItem('auth_token', response.data.token);
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
   * 회원가입 API 호출
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('회원가입 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 이메일 확인 API 호출
   */
  async verifyEmail(email: string): Promise<EmailVerificationResponse> {
    try {
      const response = await apiClient.post<EmailVerificationResponse>(
        API_ENDPOINTS.AUTH.VERIFY_EMAIL, 
        { email }
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('이메일 확인 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 로그아웃
   */
  logout(): void {
    safeLocalStorage.removeItem('auth_token');
    // 필요에 따라 서버에 로그아웃 API 호출 가능
  }
  
  /**
   * 사용자가 로그인 상태인지 확인
   */
  isAuthenticated(): boolean {
    return !!safeLocalStorage.getItem('auth_token');
  }
  
  /**
   * 에러 처리 공통 메서드
   */
  private handleError(error: unknown): void {
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
  }
}

// 싱글톤 인스턴스 제공
export const authViewModel = new AuthViewModel(); 