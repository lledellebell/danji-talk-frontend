import { useEffect, useState } from 'react';
import styles from './alert.module.scss';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  nickname: React.ReactNode;
  onClose: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: (requestMessage: string) => void;
}

const Alert: React.FC<AlertProps> = ({
  nickname,
  confirmLabel = '요청',
  cancelLabel = '취소',
  onClose,
  onConfirm,
}) => {
  const [requestMessage, setRequestMessage] = useState('');
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['alert__header']}>
          <h2
            id="alert__title"
            className={styles['alert__title']}
            style={{ fontSize: '15px' }}
          >
            {nickname}에게 대화신청
          </h2>
        </div>
        <div
          id="alert__content"
          className={styles['alert__content']}
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#999999',
            marginBottom: '20px',
          }}
        >
          <p className={styles['alert__text']} />
          대화는 상대방이 수락하면 시작됩니다. 불편한 대화가 이어질 경우, 대화를
          종료될 수 있으니 함께 편안한 대화를 나눌 수 있도록 배려해주세요.
        </div>
        <textarea
          style={{
            width: '100%',
            height: '290px',
            resize: 'none',
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 15,
            paddingBottom: 15,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#999',
            borderStyle: 'solid',
            boxSizing: 'border-box',
            fontSize: '14px',
            fontFamily: 'inherit',
            marginBottom: '20px',
          }}
          value={requestMessage}
          onChange={(e) => setRequestMessage(e.target.value)}
          placeholder="내용을 입력해주세요"
        />

        <div className={styles['dialog__footer']}>
          <button
            onClick={onClose}
            className={styles['dialog__cancel-button']}
            aria-label={cancelLabel}
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => onConfirm(requestMessage)}
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
