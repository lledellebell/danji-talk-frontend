import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlertStore } from '../../stores/alertStore';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTitle, setContent, openAlert } = useAlertStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const socialCode = params.get('social-code');
    const hasError = params.get('error') || location.pathname.includes('/login') && location.search.includes('error');
    
    // * 임시 로그인 처리
    // 백엔드에서 /login?error로 리다이렉트된 경우 처리
    if (hasError || location.pathname.includes('@')) {
      console.error('소셜 로그인 과정에서 에러가 발생했습니다:', location.pathname, location.search);
      
      setTimeout(() => {
        setTitle('로그인 실패');
        setContent('소셜 로그인 과정에서 오류가 발생했습니다. 다시 시도해 주세요.');
        openAlert();
        
        if (import.meta.env.DEV) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('tempLoginMode', 'true');
          navigate('/home');
        } else {
          navigate('/login');
        }
      }, 1000);
      return;
    }
    
    // 404 오류 가능성이 있는 상황
    const has404Error = location.pathname.includes('/error') || 
                       document.title.includes('Whitelabel Error Page');
    
    if (has404Error) {
      console.error('백엔드 서버에서 404 에러가 발생했습니다.');
      
      setTimeout(() => {
        setTitle('서버 오류');
        setContent('서버에서 일시적인 오류가 발생했습니다. 다시 시도해 주세요.');
        openAlert();
        
        if (import.meta.env.DEV) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('tempLoginMode', 'true');
        }
        
        navigate('/home');
      }, 1000);
      return;
    }
    
    if (status === 'success' && socialCode) {
      console.log('소셜 로그인 성공:', socialCode);
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('socialCode', socialCode);
      localStorage.setItem('loginType', 'kakao');
      localStorage.removeItem('prevPath');
      
      setTimeout(() => {
        navigate('/home');
        
        setTimeout(() => {
          setTitle('환영합니다');
          setContent('로그인에 성공했습니다.');
          openAlert();
        }, 300);
      }, 1500);
    } else if (status || socialCode) {
      console.error('소셜 로그인 실패:', { status, socialCode });
      
      setTimeout(() => {
        setTitle('로그인 실패');
        setContent('소셜 로그인 과정에서 오류가 발생했습니다.');
        openAlert();
        
        navigate('/home');
      }, 1000);
    } else {
      // status와 socialCode가 없는 경우 
      // (예상치 못한 URL로 접근한 경우)
      console.error('유효하지 않은 리다이렉트 URL:', location.pathname, location.search);
      
      setTimeout(() => {
        setTitle('잘못된 접근');
        setContent('유효하지 않은 방식으로 접근했습니다.');
        openAlert();
        navigate('/login');
      }, 1000);
    }
  }, [location, navigate, setTitle, setContent, openAlert]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '20px',
      background: '#f9f9f9'
    }}>
      <p style={{ 
        fontSize: '20px', 
        fontWeight: '600',
        color: '#333',
        marginBottom: '10px'
      }}>로그인 처리 중...</p>
      
      <div style={{
        width: '280px',
        height: '8px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '30%',
          backgroundColor: '#3396F4',
          borderRadius: '4px',
          animation: 'progressAnimation 1.5s ease-in-out infinite'
        }}></div>
      </div>
      
      <style>
        {`
          @keyframes progressAnimation {
            0% { width: 10%; left: 0; }
            50% { width: 30%; left: 70%; }
            100% { width: 10%; left: 0; }
          }
        `}
      </style>
      
      <p style={{ 
        fontSize: '16px', 
        fontWeight: '400',
        color: '#666',
        marginTop: '10px'
      }}>잠시만 기다려 주세요</p>
    </div>
  );
};

export default OAuthRedirect; 