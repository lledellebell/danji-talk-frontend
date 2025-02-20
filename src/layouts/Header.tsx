import styles from "./Header.module.scss";
import back_icon from "../assets/back_icon.svg";
import user_icon from "../assets/user_icon.svg";

interface HeaderProps {
  title: string;
  type: "main" | "sub"; // 메인/서브 타입 구분
  hasBackButton?: boolean; // 뒤로가기 버튼 여부
  hasIcons?: boolean; // 우측 아이콘 여부
  iconCount?: number; // 우측 아이콘 개수
}

const SubHeader: React.FC<HeaderProps> = ({
  title,
  hasIcons,
  iconCount = 1,
}) => {
  return (
    <div className={`${styles.header} ${styles["header--sub"]}`}>
      <span className={styles.header__title}>{title}</span>
      {hasIcons && (
        <div className={styles.header__icons}>
          {Array.from({ length: iconCount }).map((_, index) => (
            <img key={index} src={user_icon} alt={`아이콘 ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

const MainHeader: React.FC<HeaderProps> = ({
  title,
  hasBackButton,
  hasIcons,
  iconCount = 2,
}) => {
  return (
    <div className={`${styles.header} ${styles["header--main"]}`}>
      {hasBackButton && <img src={back_icon} alt="뒤로가기" />}
      <span className={styles.header__title}>{title}</span>
      {hasIcons && (
        <div className={styles.header__icons}>
          {Array.from({ length: iconCount }).map((_, index) => (
            <img key={index} src={user_icon} alt={`아이콘 ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
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
