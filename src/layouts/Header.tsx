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
    <header className={`${styles.header} ${styles['header--sub']}`}>
      <nav aria-label="보조 헤더 내비게이션">
        {hasBackButton && (
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className={styles['header__back-button']}
            aria-label="뒤로가기"
          >
            <img src={back_icon} alt="뒤로가기 아이콘" />
          </Link>
        )}
      </nav>
      <h1 className={styles.header__title}>{title}</h1>
      {hasText && text && (
        <button className={styles.header__button}>{text}</button>
      )}
      {hasIcons && (
        <ul className={styles.header__icons} aria-label="사용자 아이콘 목록">
          {Array.from({ length: iconCount }).map((_, index) => (
            <li key={index}>
              <img src={user_icon} alt={`아이콘 ${index + 1}`} />
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

const MainHeader: React.FC<HeaderProps> = ({
  title,
  hasBackButton,
  hasIcons,
  icons,
  iconCount = 2,
  hasText,
  text,
}) => {
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} ${styles['header--main']}`}>
      <nav aria-label="메인 헤더 내비게이션">
        {hasBackButton && (
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className={styles['header__back-button']}
            aria-label="뒤로가기"
          >
            <img src={back_icon} alt="뒤로가기 아이콘" />
          </Link>
        )}
      </nav>
      <h1 className={styles.header__title}>{title}</h1>
      {hasText && text && (
        <button className={styles.header__button}>{text}</button>
      )}
      {hasIcons && (
        <nav className={styles.header__icons} aria-label="사용자 아이콘">
          {Array.from({ length: iconCount }).map((_, index) => (
            <img key={index} src={user_icon} alt={`아이콘 ${index + 1}`} />
          ))}
        </nav>
      )}
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
