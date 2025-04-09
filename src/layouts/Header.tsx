import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import back_icon from '../assets/back_icon.svg';
import { useAuthStore } from '../stores/authStore';
import Sidebar from '../components/Sidebar/Sidebar';

interface HeaderProps {
  title: string;
  type: 'main' | 'sub';
  hasBackButton?: boolean;
  hasText?: boolean;
  hasIcons?: boolean;
  hasUserIcon?: boolean;
  iconCount?: number;
  buttonText?: string;
  hasRightButton?: boolean;
  onClickButton?: () => void;
  iconComponent?: React.ReactNode;
  onIconClick?: () => void;
}

const SubHeader: React.FC<HeaderProps> = ({
  title,
  hasBackButton,
  hasIcons,
  iconComponent,
  buttonText,
  hasRightButton,
  onClickButton,
}) => {
  const navigate = useNavigate();

  return (
    <header
      className={`${styles.header} ${styles['header--sub']}`}
      role="banner"
    >
      <div className={styles.header__container}>
        <nav
          className={styles.header__navigation}
          aria-label="보조 헤더 내비게이션"
        >
          {hasBackButton && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles['header__back-button']}
              aria-label="이전 페이지로 이동"
            >
              <img src={back_icon} alt="" aria-hidden="true" />
            </button>
          )}
        </nav>
        <h1 className={styles.header__title} id="subheader-title">
          {title}
        </h1>
        {hasRightButton && (
          <button onClick={onClickButton} className={styles.header__button}>
            <span className={styles.header__button_text}>{buttonText}</span>
          </button>
        )}
        {hasIcons && iconComponent && (
          <button
            type="button"
            className={styles.header__icon}
            aria-label="설정"
            // onClick={() => navigate('/settings')}
          >
            {iconComponent}
          </button>
        )}
      </div>
    </header>
  );
};

const MainHeader: React.FC<HeaderProps> = ({ title }) => {
  const { isLoggedIn } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header
        className={`${styles.header} ${styles['header--main']}`}
        role="banner"
      >
        <div className={styles.header__container}>
          <h1 className={styles.header__title} id="mainheader-title">
            <Link to="/" className={styles.header__title_link}>
              {title}
            </Link>
          </h1>
          {isLoggedIn ? (
            <button
              type="button"
              className={styles.header__icon}
              aria-label="메뉴 열기"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.header__icon_svg}
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : (
            <Link to="/login" className={styles.header__button}>
              <span className={styles.header__button_text}>로그인</span>
            </Link>
          )}
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

const Header: React.FC<HeaderProps> = (props) => {
  return props.type === 'main' ? (
    <MainHeader {...props} />
  ) : (
    <SubHeader {...props} />
  );
};

export default Header;
