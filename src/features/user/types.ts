/**
 * 사용자 관련 타입 정의
 */

// 사용자 인터페이스
export interface User {
  id: string;
  email: string;
  username: string;
  nickname?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// 프로필 업데이트 요청
export interface UpdateProfileRequest {
  username?: string;
  nickname?: string;
  password?: string;
  profileImage?: File;
}

// 프로필 업데이트 응답
export interface UpdateProfileResponse {
  id: string;
  email: string;
  username: string;
  nickname?: string;
  profileImage?: string;
  updatedAt: string;
}

// 계정 삭제 요청
export interface DeleteAccountRequest {
  password: string;
}
