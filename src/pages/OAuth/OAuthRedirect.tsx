import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlertStore } from '../../stores/alertStore';
import { useAuthStore } from '../../stores/authStore';
import axios from 'axios';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTitle, setContent, openAlert } = useAlertStore();
  const setIsAuthenticated = useAuthStore((state) => state.login);

  useEffect(() => {
    const processLogin = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        const code = params.get('social-code');

        if (status === 'success' && code) {
          try {
            // 백엔드 API를 호출하여 실제 인증 정보를 교환
            const response = await axios.get(
              `/api/oauth/exchange?code=${code}`,
              {
                withCredentials: true,
              }
            );

            if (response.data.accessToken) {
              // 토큰 저장
              setIsAuthenticated();
              navigate('/');
            } else {
              console.error('토큰이 응답에 없습니다:', response.data);
              setTitle('로그인 실패');
              setContent('인증에 실패했습니다.');
              openAlert();
              navigate('/login');
            }
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
  }, [location, navigate, setTitle, setContent, openAlert, setIsAuthenticated]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '16px',
        background: '#f9f9f9',
      }}
    >
      <div
        className="spinner"
        style={{
          width: '30px',
          height: '30px',
          border: '5px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
          borderTop: '5px solid #96bbff',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      <p
        style={{
          fontSize: '18px',
          fontWeight: '500',
          color: '#333',
        }}
      >
        로그인 처리 중...
      </p>
    </div>
  );
};

export default OAuthRedirect;
