import styles from './SocialLoginList.module.scss';
import SocialLoginListItem from '../ListItem/SocialLoginListItem';
import KakaoIcon from '../../../assets/social/kakao.svg';
import GoogleIcon from '../../../assets/social/google.svg';
import NaverIcon from '../../../assets/social/naver.svg';

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
  return (
    <ul className={styles['social-login-list']} aria-label="소셜 로그인 버튼 목록">
      {socialAccounts.map(account => (
        <SocialLoginListItem key={account.id}>
          <button className={styles['social-login-button']} aria-label={account.ariaLabel}>
            {account.text}
          </button>
        </SocialLoginListItem>
      ))}
    </ul>
  );
};

export default SocialLoginList; 