/**
 * 인증 관련 타입 정의
 */

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

// 회원가입 요청 인터페이스
export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  nickname?: string;
  phoneNumber?: string;
}

// 회원가입 응답 인터페이스
export interface RegisterResponse {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

// 이메일 인증 요청 인터페이스
export interface EmailVerificationRequest {
  email: string;
}

// 이메일 인증 응답 인터페이스
export interface EmailVerificationResponse {
  isVerified: boolean;
  message: string;
}
