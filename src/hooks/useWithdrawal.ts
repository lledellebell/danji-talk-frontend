import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useWithdrawalStore } from '../stores/withdrawalStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

// 환경 변수에서 API URL 직접 가져오기
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://danjitalk.duckdns.org';
const IS_DEV = import.meta.env.VITE_NODE_ENV === 'development';

/**
 * 모든 브라우저 데이터 초기화 함수
 * 로컬 스토리지, 세션 스토리지, 쿠키를 모두 삭제
 */
const clearBrowserData = () => {
  localStorage.clear();
  sessionStorage.clear();
  
  // 쿠키 삭제
  document.cookie.split(";").forEach(c => {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, 
      "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};

export const useWithdrawalMutation = () => {
  const { setError } = useWithdrawalStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (password: string) => {
      try {
        // 개발 환경 체크를 환경 변수로 판단
        const isDevEnvironment = IS_DEV || window.location.hostname === 'localhost';
        const apiUrl = isDevEnvironment ? '/api/member' : `${API_BASE_URL}/api/member`;
        
        // 비밀번호만 사용하여 회원 탈퇴 API 호출
        await axios.delete(apiUrl, {
          data: { password },
          withCredentials: true
        });
        
        // 성공 처리 - 유틸리티 함수 사용
        clearBrowserData();
        // 로그아웃 처리 추가
        useAuthStore.getState().logout();
        navigate('/');
        return true;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // 개발 환경에서만 상세 에러 로깅
          if (IS_DEV) {
            console.error('상세 오류 정보:', error);
          }
          
          // 오류 유형별 메시지 설정
          if (error.code === 'ERR_NETWORK') {
            setError('서버에 연결할 수 없습니다. 인터넷 연결을 확인하거나 나중에 다시 시도해주세요.');
          } else if (error.response?.status === 400) {
            setError('비밀번호가 일치하지 않습니다.');
          } else if (error.response?.status === 401 || error.response?.status === 403) {
            setError('로그인 상태가 아니거나 접근 권한이 없습니다.');
          } else {
            setError('회원 탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
        throw error;
      }
    },
    onError: (error) => {
      // 개발 환경에서만 콘솔 로깅
      if (IS_DEV) {
        console.error('회원 탈퇴 실패:', error);
      }
    }
  });
}; 