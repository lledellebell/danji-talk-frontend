import styles from './RegisterSuccessPage.module.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className={styles['logo']}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export const RegisterSuccessPage = () => {
  return (
    <div className={styles['register-success-container']}>
      <div className={styles['register-success-wrapper']}>
        <Logo />
        <p className={styles['register-success-text']}>
          <span className={styles['title']}>회원가입이 완료되었습니다.</span>
          <span>이제 서비스를 이용하실 준비가 되었습니다.</span>
          <span>로그인 후 시작하세요!</span>
        </p>
        <Link to="/login" className={styles['register-success-button']}>
          로그인하고 시작하기
        </Link>
      </div>
    </div>
  );
};
