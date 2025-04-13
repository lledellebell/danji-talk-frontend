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
        const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY || import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
        const REDIRECT_URI = window.location.origin + '/oauth/kakao/callback';
        
        // console.log('카카오 토큰 요청 파라미터:', {
        //   grant_type: 'authorization_code',
        //   client_id: CLIENT_ID,
        //   redirect_uri: REDIRECT_URI,
        //   code
        // });

        // 1. 카카오 API로 토큰 요청 - 수정된 방식으로 요청
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('client_id', CLIENT_ID);
        formData.append('redirect_uri', REDIRECT_URI);
        formData.append('code', code);

        const tokenResponse = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          formData.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }
        );

        if (tokenResponse.data.access_token) {
          // 2. 백엔드에 카카오 토큰 전송
          try {
            const apiBaseUrl = import.meta.env.VITE_API_URL || '';
            const apiPath = '/api/auth/kakao';
            
            console.log('백엔드 API 호출:', `${apiBaseUrl}${apiPath}`);
            
            // 백엔드 API에 카카오 토큰 전송
            const backendResponse = await axios.post(`${apiBaseUrl}${apiPath}`, {
              token: tokenResponse.data.access_token
            }, {
              withCredentials: true, // CORS 쿠키 전송 활성화
              timeout: 5000 
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
            
            // 개발 환경
            if (import.meta.env.DEV) {
              console.log('개발 환경: 백엔드 연동 없이 임시 로그인 처리');
              
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('kakaoToken', tokenResponse.data.access_token);
              
              setTitle('개발 모드 로그인');
              setContent('백엔드 연동 없이 임시로 로그인 처리되었습니다.');
              openAlert();
              
              navigate('/');
              return;
            }
            
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
        
        // 오류 상세 정보 로깅
        // if (axios.isAxiosError(error) && error.response) {
        //   console.error('카카오 오류 상세 정보:', {
        //     status: error.response.status,
        //     statusText: error.response.statusText,
        //     data: error.response.data
        //   });
        // }
        
        // 개발 환경에서는 임시 로그인 처리
        if (import.meta.env.DEV) {
          // console.log('개발 환경: 오류 발생했지만 임시 로그인 처리합니다.');
          setTitle('개발 모드 로그인');
          setContent('오류가 발생했지만 개발 모드에서 임시로 로그인 처리되었습니다.');
          openAlert();
          
          // 임시 카카오 토큰 생성 
          const tempToken = `temp_kakao_token_${Date.now()}`;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('kakaoToken', tempToken);
          
          navigate('/home');
          return;
        }
        
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