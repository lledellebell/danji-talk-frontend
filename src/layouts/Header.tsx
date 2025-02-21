import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import back_icon from "../assets/back_icon.svg";
import user_icon from "../assets/user_icon.svg";

interface HeaderProps {
  title: string;
  type: "main" | "sub";
  hasBackButton?: boolean;
  hasIcons?: boolean;
  iconCount?: number;
}

const SubHeader: React.FC<HeaderProps> = ({
  title,
  hasIcons,
  iconCount = 1,
}) => {
  return (
    <header className={`${styles.header} ${styles["header--sub"]}`}>
      <h1 className={styles.header__title}>{title}</h1>
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

const MainHeader: React.FC<HeaderProps> = ({
  title,
  hasBackButton,
  hasIcons,
  iconCount = 2,
}) => {
  const navigate = useNavigate();

  return (
    <header className={`${styles.header} ${styles["header--main"]}`}>
      {hasBackButton && (
        <button
          onClick={() => navigate(-1)}
          className={styles["header__back"]}
          aria-label="뒤로가기"
        >
          <img src={back_icon} alt="뒤로가기" />
        </button>
      )}
      <h1 className={styles.header__title}>{title}</h1>
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
  return props.type === "main" ? (
    <MainHeader {...props} />
  ) : (
    <SubHeader {...props} />
  );
};

export default Header;
