import { useUserStore } from '../../stores/userStore';
import styles from './ShowEmail.module.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <img
        className={styles['logo']}
        width={200}
        height={200}
        src={logo}
        loading="lazy"
        alt="logo"
      />
    </>
  );
};

const ShowEmail = () => {
  const userEmail = useUserStore((state) => state.userEmail);

  return (
    <div className={styles['show-email__container']}>
      <div className={styles['show-email__main-wrapper']}>
        {userEmail ? (
          <>
            <Logo />
            <p className={styles['show-email__text']}>
              회원님의 이메일은
              <br />
              <b>{userEmail}</b> 입니다.
            </p>
          </>
        ) : (
          <p className={styles['show-email__text']}>
            사용자 정보를 찾을 수 없습니다.
          </p>
        )}
      </div>
      <div className={styles['show-email__button-wrapper']}>
        <Link to="/login" className={styles['show-email__button']}>
          로그인페이지로 이동
        </Link>
      </div>
    </div>
  );
};

export default ShowEmail;
