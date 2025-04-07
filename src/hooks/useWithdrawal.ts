import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useWithdrawalStore } from '../stores/withdrawalStore';
import { useNavigate } from 'react-router-dom';

export const useWithdrawalMutation = () => {
  const { setError } = useWithdrawalStore();
  const navigate = useNavigate();

  /**
   * 인증 토큰 확인 함수
   * @returns {Promise<string|null>} 유효한 토큰 또는 null
   */
  const checkAuth = async () => {
    try {
      // 로그인 정보 확인을 위한 여러 소스 시도
      let token = localStorage.getItem('token') || 
                localStorage.getItem('accessToken') || 
                sessionStorage.getItem('token');
      
      // 테스트 환경이거나 개발 단계인 경우 - 하드코딩된 테스트 토큰 사용
      // 실제 배포 환경에서는 이 부분 제거
      if (!token && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
        console.log('개발 환경에서 임시 토큰 사용');
        token = 'test_token';
      }
      
      if (!token) {
        setError('로그인 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.');
        return null;
      }
      
      return token;
    } catch (err) {
      console.error('인증 확인 실패:', err);
      return null;
    }
  };

  return useMutation({
    mutationFn: async (password: string) => {
      // DEV: 개발 환경에서는 회원 탈퇴 API 모의 구현
      // PROD: 배포 시 이 부분 제거 필요
      if (process.env.NODE_ENV === 'development') {
        console.log('개발 환경: 회원 탈퇴 API 호출 생략');
        
        // 비밀번호 검증 로직 시뮬레이션 (실제 앱에서는 제거)
        if (password === 'wrong') {
          setError('비밀번호가 일치하지 않습니다.');
          throw new Error('비밀번호가 일치하지 않습니다.');
        }
        
        // 성공 처리
        console.log('회원 탈퇴 성공 시뮬레이션');
        
        // 로컬 스토리지 등 클리어
        localStorage.clear();
        sessionStorage.clear();
        
        // 홈으로 리다이렉트
        setTimeout(() => {
          navigate('/');
        }, 1000);
        
        return true;
      }
      
      // FIXME: 백엔드 API 엔드포인트 확인 필요
      // NOTE: 현재 토큰 인증 문제로 401 에러 발생
      // TODO: 백엔드팀과 인증 방식 협의 필요
      
      // 프로덕션 환경에서는 실제 API 호출 시도
      const token = await checkAuth();
      
      if (!token) {
        setTimeout(() => navigate('/login'), 2000);
        throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');
      }
      
      await axios.delete('https://danjitalk.duckdns.org/api/member', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: { password }
      });
      
      // 성공 처리
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach(c => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, 
          "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      navigate('/');
      console.log('Withdrawal successful');
      return true;
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
    }
  });
}; 