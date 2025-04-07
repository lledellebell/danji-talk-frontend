import React, { useEffect, useState } from 'react';
import styles from './dialog.module.scss';
import { useDialogStore } from '../../../stores/dialogStore';

export interface DialogProps {
  title: React.ReactNode;
  content: React.ReactNode;
  onClose: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  content,
  onClose,
  cancelLabel = '취소',
  confirmLabel = '확인',
  onConfirm,
}) => {
  const { isOpen } = useDialogStore();
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

  if (!isOpen) return null;
  
  // PC 환경에서 device-frame 내부에 Dialog 렌더링
  if (isPc && deviceFrame) {
    return (
      <div
        className={`${styles['dialog__overlay']} ${styles['dialog__overlay--in-frame']}`}
        onClick={onClose}
        role="dialog"
        aria-labelledby="dialog__title"
        aria-modal="true"
      >
        <div
          className={styles['dialog__container']}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <div className={styles['dialog__header']}>
            <h2
              id="dialog__title"
              className={styles['dialog__title']}
              dangerouslySetInnerHTML={{ __html: title as string }}
            />
          </div>
          <div className={styles['dialog__content']}>
            <p
              className={styles['dialog__text']}
              dangerouslySetInnerHTML={{ __html: content as string }}
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
  }

  // 모바일 환경에서는 기존 방식대로 렌더링
  return (
    <div
      className={styles['dialog__overlay']}
      onClick={onClose}
      role="dialog"
      aria-labelledby="dialog__title"
      aria-modal="true"
    >
      <div
        className={styles['dialog__container']}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className={styles['dialog__header']}>
          <h2
            id="dialog__title"
            className={styles['dialog__title']}
            dangerouslySetInnerHTML={{ __html: title as string }}
          />
        </div>
        <div className={styles['dialog__content']}>
          <p
            className={styles['dialog__text']}
            dangerouslySetInnerHTML={{ __html: content as string }}
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

export default Dialog;
