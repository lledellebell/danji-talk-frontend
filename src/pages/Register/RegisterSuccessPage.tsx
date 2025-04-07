import styles from './RegisterSuccessPage.module.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Logo = () => {
  return (
    <div className={styles['logo']}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export const RegisterSuccessPage = () => {
  const [isPc, setIsPc] = useState(false);
  const [hasDeviceFrame, setHasDeviceFrame] = useState(false);

  useEffect(() => {
    // PC 환경 감지
    const checkDevice = () => {
      setIsPc(window.innerWidth >= 768);
    };
    
    // device-frame 존재 여부 확인
    const checkDeviceFrame = () => {
      const deviceFrame = document.querySelector('.device-frame');
      setHasDeviceFrame(!!deviceFrame);
    };
    
    checkDevice();
    checkDeviceFrame();
    
    window.addEventListener('resize', checkDevice);
    window.addEventListener('resize', checkDeviceFrame);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('resize', checkDeviceFrame);
    };
  }, []);
  
  // 버튼 컨테이너 클래스 결정
  const buttonContainerClass = isPc && hasDeviceFrame
    ? `${styles['register-success-button-container']} ${styles['in-device-frame']}`
    : styles['register-success-button-container'];

  return (
    <div className={styles['register-success-container']}>
      <div className={styles['register-success-content']}>
        <Logo />
        <p className={styles['register-success-text']}>
          <span className={styles['title']}>회원가입이 완료되었습니다.</span>
          <span>이제 서비스를 이용하실 준비가 되었습니다.</span>
          <span>로그인 후 시작하세요!</span>
        </p>
      </div>
      <div className={buttonContainerClass}>
        <Link to="/login" className={styles['register-success-button']}>
          로그인하고 시작하기
        </Link>
      </div>
    </div>
  );
};
