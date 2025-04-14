import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlertStore } from '../../stores/alertStore';
import axios from 'axios';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTitle, setContent, openAlert } = useAlertStore();
  const [loadingState, setLoadingState] = useState('loading'); 

  useEffect(() => {
    const processLogin = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        const code = params.get('social-code');

        if (status === 'success' && code) {
          // console.log('✅ 받은 uuid:', code);

          try {
            // 백엔드 API를 호출하여 실제 인증 정보를 교환
            const response = await axios.get(`https://danjitalk.duckdns.org/api/oauth/exchange?code=${code}`, {
              withCredentials: true,
            });

            console.log('🔄 토큰 교환 성공:', response.data);

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('socialCode', code);
            localStorage.setItem('loginType', 'kakao');
            localStorage.removeItem('prevPath');

            setTitle('로그인 성공');
            setContent('소셜 계정으로 로그인되었습니다.');
            openAlert();

            setLoadingState('success');
            setTimeout(() => {
              navigate('/home', { replace: true });
            }, 800);
          } catch (exchangeError) {
            console.error('🔄 토큰 교환 오류:', exchangeError);
            
            setTitle('로그인 실패');
            setContent('인증 정보 교환 중 오류가 발생했습니다.');
            openAlert();
            
            navigate('/login');
          }
        } else {
          console.error('소셜 로그인 실패:', { status, code });
          
          setTitle('로그인 실패');
          setContent('소셜 로그인 과정에서 오류가 발생했습니다.');
          openAlert();
          
          navigate('/login');
        }
      } catch (error) {
        console.error('처리 중 오류 발생:', error);
        
        setTitle('오류');
        setContent('로그인 처리 중 오류가 발생했습니다.');
        openAlert();
        
        navigate('/login');
      }
    };

    processLogin();
  }, [location, navigate, setTitle, setContent, openAlert]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '16px',
      background: '#f9f9f9'
    }}>
      {loadingState === 'loading' && (
        <>
          <div className="spinner" style={{
            width: '30px',
            height: '30px',
            border: '5px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
            borderTop: '5px solid #96bbff',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ 
            fontSize: '18px', 
            fontWeight: '500',
            color: '#333'
          }}>로그인 처리 중...</p>
        </>
      )}
    </div>
  );
};

export default OAuthRedirect; 