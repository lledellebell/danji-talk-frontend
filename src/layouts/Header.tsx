import { useNavigate, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import back_icon from '../assets/back_icon.svg';
import user_icon from '../assets/user_icon.svg';

interface HeaderProps {
  title: string;
  type: 'main' | 'sub';
  hasBackButton?: boolean;
  hasText?: boolean;
  hasIcons?: boolean;
  hasUserIcon?: boolean;
  iconCount?: number;
  text?: string;
}

const SubHeader: React.FC<HeaderProps> = ({
  title,
  hasBackButton,
  hasIcons,
  iconCount = 1,
  hasText,
  text,
}) => {
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} ${styles['header--sub']}`} role="banner">
      <div className={styles.header__container}>
        <nav className={styles.header__navigation} aria-label="보조 헤더 내비게이션">
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
        <h1 className={styles.header__title} id="subheader-title">{title}</h1>
        {hasText && text && (
          <button 
            type="button" 
            className={styles.header__button}
            aria-label={text}
          >
            {text}
          </button>
        )}
        {hasIcons && (
          <div className={styles.header__icons} role="complementary" aria-label="사용자 프로필 영역">
            <ul>
              {Array.from({ length: iconCount }).map((_, index) => (
                <li key={index}>
                  <button 
                    type="button" 
                    className={styles.header__icon}
                    aria-label={`사용자 프로필 ${index + 1}`}
                  >
                    <img src={user_icon} alt="" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

const MainHeader: React.FC<HeaderProps> = ({
  title,
  hasBackButton,
  hasIcons,
  iconCount = 2,
  hasText,
  text,
}) => {
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} ${styles['header--main']}`} role="banner">
      <div className={styles.header__container}>
        <nav className={styles.header__navigation} aria-label="메인 헤더 내비게이션">
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
        <h1 className={styles.header__title} id="mainheader-title">{title}</h1>
        {hasText && text && (
          <button 
            type="button" 
            className={styles.header__button}
            aria-label={text}
          >
            {text}
          </button>
        )}
        {hasIcons && (
          <div className={styles.header__icons} role="complementary" aria-label="사용자 프로필 영역">
            {Array.from({ length: iconCount }).map((_, index) => (
              <button 
                key={index}
                type="button" 
                className={styles.header__icon}
                aria-label={`사용자 프로필 ${index + 1}`}
              >
                <img src={user_icon} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
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
