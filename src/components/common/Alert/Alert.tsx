import { useEffect } from 'react';
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
  useEffect(() => {
    const appContainer = document.querySelector('.app-container') as HTMLElement;
    const deviceFrame = document.querySelector('.device-frame') as HTMLElement;
    const isPc = window.innerWidth >= 768;
    
    const scrollPosition = window.scrollY;
    
    if (appContainer) {
      appContainer.style.overflow = 'hidden';
    }
    
    if (deviceFrame) {
      deviceFrame.style.overflow = 'hidden';
    }
    
    if (!isPc) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollPosition}px`;
    }
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      if (appContainer) {
        appContainer.style.overflow = '';
      }
      
      if (deviceFrame) {
        deviceFrame.style.overflow = '';
      }
      
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      if (!isPc) {
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
      }
    };
  }, []);

  const isPc = window.innerWidth >= 768;
  const deviceFrame = document.querySelector('.device-frame');
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
