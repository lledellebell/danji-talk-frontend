import React from 'react';
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

const Dialog: React.FC<DialogProps> = ({ title, content, onClose, cancelLabel = '취소', confirmLabel = '확인', onConfirm }) => {
  const { isOpen } = useDialogStore();

  if (!isOpen) return null;

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
          <h2 id="dialog__title" className={styles['dialog__title']} dangerouslySetInnerHTML={{ __html: title as string }} />
        </div>
        <div className={styles['dialog__content']}>
          <p className={styles['dialog__text']} dangerouslySetInnerHTML={{ __html: content as string }} />
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