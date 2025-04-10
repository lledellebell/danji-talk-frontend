import styles from './SocialLoginList.module.scss';
import SocialLoginListItem from '../ListItem/SocialLoginListItem';
import KakaoIcon from '../../../assets/social/kakao.svg';
import GoogleIcon from '../../../assets/social/google.svg';
import NaverIcon from '../../../assets/social/naver.svg';
import { useEffect } from 'react';
import { useAlertStore } from '../../../stores/alertStore';

const KakaoLoginIcon = () => {
  return <img src={KakaoIcon} alt="카카오 로그인 하기" />;
};

const GoogleLoginIcon = () => {
  return <img src={GoogleIcon} alt="구글 로그인 하기" />;
};

const NaverLoginIcon = () => {
  return <img src={NaverIcon} alt="네이버 로그인 하기" />;
};

const KAKAO_LOGIN_LABEL = '카카오 로그인 하기';

const socialAccounts = [
  { id: 1, text: <KakaoLoginIcon />, ariaLabel: KAKAO_LOGIN_LABEL },
  { id: 2, text: <GoogleLoginIcon />, ariaLabel: '구글 로그인 하기' },
  { id: 3, text: <NaverLoginIcon />, ariaLabel: '네이버 로그인 하기' },
];

const SocialLoginList: React.FC = () => {
  const { setTitle, setContent, openAlert } = useAlertStore();

  const handleSocialLogin = (provider: string) => {
    setTitle('안내');
    setContent(`${provider.replace(' 하기', '')} 기능은 현재 개발 중입니다.<br />빠른 시일 내에 서비스 제공 예정입니다.`);
    openAlert();
  };

  useEffect(() => {
    const hasKakaoLogin = socialAccounts.some(
      (account) => account.ariaLabel === KAKAO_LOGIN_LABEL
    );

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
    <>
      <ul
        className={styles['social-login-list']}
        aria-label="소셜 로그인 버튼 목록"
      >
        {socialAccounts.map((account) => (
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
    </>
  );
};

export default SocialLoginList;
