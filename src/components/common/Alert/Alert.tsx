import React, { useEffect, useState } from 'react';
import styles from './alert.module.scss';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  alertTitle: React.ReactNode;
  alertContent: React.ReactNode;
  onClose: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  alertTitle,
  alertContent,
  confirmLabel = '확인',
  onClose,
  onConfirm,
}) => {
  const [isPc, setIsPc] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState<HTMLElement | null>(null);

  // PC 환경 감지 및 device-frame 요소 찾기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsPc(window.innerWidth >= 768);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      
      // device-frame 요소 찾기
      const frame = document.querySelector('.device-frame') as HTMLElement;
      setDeviceFrame(frame);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // 오버레이 클래스 결정: PC + device-frame 존재 시 특별 클래스 추가
  const overlayClass = isPc && deviceFrame 
    ? `${styles['alert__overlay']} ${styles['alert__overlay--in-frame']}` 
    : styles['alert__overlay'];

  return (
    <div
      className={overlayClass}
      role="alertdialog"
      aria-labelledby="alert__title"
      aria-describedby="alert__content"
    >
      <div
        className={styles['alert__container']}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['alert__header']}>
          <h2 id="alert__title" className={styles['alert__title']}>
            {alertTitle}
          </h2>
        </div>
        <div id="alert__content" className={styles['alert__content']}>
          <p
            className={styles['alert__text']}
            dangerouslySetInnerHTML={{ __html: alertContent as string }}
          />
        </div>
        <div className={styles['alert__footer']}>
          <button
            onClick={onConfirm || onClose}
            className={styles['alert__confirm-button']}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
