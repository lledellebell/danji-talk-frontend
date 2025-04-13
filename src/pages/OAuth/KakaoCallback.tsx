import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlertStore } from '../../stores/alertStore';

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTitle, setContent, openAlert } = useAlertStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getKakaoToken = async () => {
      // URL에서 인가 코드 추출
      const code = location.search.split('=')[1];
      
      if (!code) {
        setTitle('오류');
        setContent('인증 코드를 찾을 수 없습니다.');
        openAlert();
        navigate('/login');
        return;
      }

      try {
        const CLIENT_ID = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
        const REDIRECT_URI = window.location.origin + '/oauth/kakao/callback';

        // 1. 카카오 API로 토큰 요청
        const tokenResponse = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          null,
          {
            params: {
              grant_type: 'authorization_code',
              client_id: CLIENT_ID,
              redirect_uri: REDIRECT_URI,
              code
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }
        );

        if (tokenResponse.data.access_token) {
          // 2. 백엔드에 카카오 토큰 전송
          try {
            const backendResponse = await axios.post('/api/auth/kakao', {
              token: tokenResponse.data.access_token
            });

            if (backendResponse.data.success) {
              // 로그인 성공 처리
              setTitle('로그인 성공');
              setContent('카카오 계정으로 로그인되었습니다.');
              openAlert();
              navigate('/');
            } else {
              throw new Error('백엔드 인증 실패');
            }
          } catch (error) {
            console.error('백엔드 인증 오류:', error);
            setTitle('로그인 실패');
            setContent('서버 인증 과정에서 오류가 발생했습니다.');
            openAlert();
            navigate('/login');
          }
        } else {
          throw new Error('카카오 토큰 발급 실패');
        }
      } catch (error) {
        console.error('카카오 인증 오류:', error);
        setTitle('로그인 실패');
        setContent('카카오 인증 과정에서 오류가 발생했습니다.');
        openAlert();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    getKakaoToken();
  }, [location, navigate, openAlert, setContent, setTitle]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div className="spinner"></div>
        <p>카카오 로그인 처리 중...</p>
      </div>
    );
  }

  return null;
};

export default KakaoCallback; 