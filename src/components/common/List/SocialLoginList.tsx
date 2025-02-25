import styles from './SocialLoginList.module.scss';
import SocialLoginListItem from '../ListItem/SocialLoginListItem';
import KakaoIcon from '../../../assets/social/kakao.svg';
import GoogleIcon from '../../../assets/social/google.svg';
import NaverIcon from '../../../assets/social/naver.svg';
import { useEffect } from 'react';
import { useKakaoLogin } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Kakao {
    init: (key: string) => void;
    isInitialized: () => boolean;
  }

  interface Window {
    Kakao: Kakao;
  }
}

const KakaoLoginIcon = () => {
  return <img src={KakaoIcon} alt="카카오 로그인 하기" />;
};

const GoogleLoginIcon = () => {
  return <img src={GoogleIcon} alt="구글 로그인 하기" />;
};

const NaverLoginIcon = () => {
  return <img src={NaverIcon} alt="네이버 로그인 하기" />;
};

const socialAccounts = [
  { id: 1, text: <KakaoLoginIcon />, ariaLabel: '카카오 로그인 하기' },
  { id: 2, text: <GoogleLoginIcon />, ariaLabel: '구글 로그인 하기' },
  { id: 3, text: <NaverLoginIcon />, ariaLabel: '네이버 로그인 하기' },
];

const SocialLoginList: React.FC = () => {
  const navigate = useNavigate();
  const handleKakaoLogin = useKakaoLogin();
  
  const handleSocialLogin = (provider: string) => {
    if (provider === '카카오 로그인 하기') {
      handleKakaoLogin();
      navigate('/');
    }
  };

  useEffect(() => {
    const hasKakaoLogin = socialAccounts.some(account => account.ariaLabel === '카카오 로그인 하기');
    
    if (hasKakaoLogin && window.Kakao) {
      const appKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
      console.log('Kakao App Key:', appKey);

      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(appKey);
      } else {
        console.log('Kakao SDK는 이미 초기화되었습니다.');
      }
    }
  }, []);

  return (
    <ul className={styles['social-login-list']} aria-label="소셜 로그인 버튼 목록">
      {socialAccounts.map(account => (
        <SocialLoginListItem key={account.id}>
          <button 
            className={styles['social-login-button']} 
            aria-label={account.ariaLabel}
            onClick={() => handleSocialLogin(account.ariaLabel)}
          >
            {account.text}
          </button>
        </SocialLoginListItem>
      ))}
    </ul>
  );
};

export default SocialLoginList; 