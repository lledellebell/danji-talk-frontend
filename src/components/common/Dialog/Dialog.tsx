import React from 'react';
import styles from './dialog.module.scss';
import { useDialogStore } from '../../../stores/dialogStore';

export interface DialogProps {
  title: React.ReactNode;
  content: React.ReactNode;
  onClose: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}

const Dialog: React.FC<DialogProps> = ({ title, content, onClose, cancelLabel = '취소', confirmLabel = '확인' }) => {
  const { isOpen, closeDialog } = useDialogStore();

  if (!isOpen) return null;

  return (
    <div className={styles['dialog-overlay']} onClick={onClose}>
      <div className={styles['dialog-container']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['dialog-header']}>
          <h2 className={styles['dialog-title']}>{title}</h2>
        </div>
        <div className={styles['dialog-content']}>
          <p className={styles['dialog-text']}>{content}</p>
        </div>
        <div className={styles['dialog-footer']}>
          <button onClick={onClose} className={styles['dialog-cancel-button']}>
            {cancelLabel}
          </button>
          <button onClick={closeDialog} className={styles['dialog-confirm-button']}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog; 