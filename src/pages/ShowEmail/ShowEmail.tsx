import { useUserStore } from '../../stores/userStore';
import styles from './ShowEmail.module.scss';
import logo from '../../assets/logo.svg';

const Logo = () => {
  return (
    <div className={styles['logo']}>
      <img src={logo} alt="logo" />
    </div>
  );
};

const ShowEmail = () => {
  const userEmail = useUserStore((state) => state.userEmail);

  return (
    <div className={styles['show-email-container']}>
      <div className={styles['show-email-wrapper']}>
        {userEmail ? (
          <>
            <Logo />
            <p className={styles['show-email-text']}>회원님의 이메일은<br/><b>{userEmail}</b>입니다.</p>
          </>
        ) : (
          <p className={styles['show-email-text']}>사용자 정보를 찾을 수 없습니다.</p>
        )}
        <button className={styles['show-email-button']}>로그인페이지로 이동</button>
      </div>
    </div>
  );
};

export default ShowEmail; 