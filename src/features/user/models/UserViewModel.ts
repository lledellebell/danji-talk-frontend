import { apiClient } from '../../../api/client';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { AxiosError } from 'axios';
import {
  User,
  UpdateProfileRequest,
  UpdateProfileResponse,
  DeleteAccountRequest
} from '../types';

// 에러 메시지 매핑
const errorMessages = {
  401: '로그인이 필요한 기능입니다',
  403: '권한이 없습니다',
  404: '존재하지 않는 사용자입니다',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  networkError: '인터넷 연결을 확인해주세요',
  default: '사용자 정보를 불러오는 중 오류가 발생했습니다',
};

/**
 * 사용자 관련 비즈니스 로직을 처리하는 ViewModel
 */
export class UserViewModel {
  /**
   * 사용자 프로필 조회
   */
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error(errorMessages.default);
    }
  }
  
  /**
   * 사용자 프로필 업데이트
   */
  async updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    try {
      // 일반 필드와 파일 필드를 나누어 처리
      const formData = new FormData();
      
      // 일반 필드 추가
      if (data.username) formData.append('username', data.username);
      if (data.nickname) formData.append('nickname', data.nickname);
      if (data.password) formData.append('password', data.password);
      
      // 프로필 이미지 추가
      if (data.profileImage) formData.append('profileImage', data.profileImage);
      
      const response = await apiClient.put<UpdateProfileResponse>(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('프로필 업데이트 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 계정 삭제
   */
  async deleteAccount(data: DeleteAccountRequest): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.USER.DELETE_ACCOUNT, {
        data,
      });
      
      // 삭제 후 토큰 제거
      localStorage.removeItem('auth_token');
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('계정 삭제 중 오류가 발생했습니다');
    }
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
export const userViewModel = new UserViewModel(); 