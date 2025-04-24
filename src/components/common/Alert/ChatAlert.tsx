import { useEffect } from 'react';
import styles from './alert.module.scss';
import profileIcon from '../../../assets/board/profile.svg';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  nickname: React.ReactNode;
  profile: string;
  onClose: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  nickname,
  confirmLabel = '대화신청',
  cancelLabel = '취소',
  profile,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    const appContainer = document.querySelector(
      '.app-container'
    ) as HTMLElement;
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
  const overlayClass =
    isPc && deviceFrame
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
        style={{ display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={profileIcon || profile}
          alt=""
          style={{ width: '100%', height: '80px', marginBottom: '20px' }}
        />
        <div id="alert__content" className={styles['alert__content']}>
          <p
            className={styles['alert__text']}
            dangerouslySetInnerHTML={{ __html: nickname as string }}
          />
        </div>
        <div className={styles['dialog__footer']}>
          <button
            onClick={onClose}
            className={styles['dialog__cancel-button']}
            aria-label={cancelLabel}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={styles['dialog__confirm-button']}
            aria-label={confirmLabel}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
