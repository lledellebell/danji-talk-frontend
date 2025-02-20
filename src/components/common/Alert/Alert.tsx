import React from 'react';
import styles from './alert.module.scss';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  alertTitle: React.ReactNode;
  alertContent: React.ReactNode;
  onClose: () => void;
  confirmLabel?: string;
}

const Alert: React.FC<AlertProps> = ({ alertTitle, alertContent, confirmLabel = '확인', onClose }) => {
  return (
    <div className={styles['alert-overlay']} role="alertdialog" aria-labelledby="alert-title" aria-describedby="alert-content">
      <div className={styles['alert-container']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['alert-header']}>
          <h2 id="alert-title" className={styles['alert-title']}>{alertTitle}</h2>
        </div>
        <div id="alert-content" className={styles['alert-content']}>
          <p className={styles['alert-text']}>{alertContent}</p>
        </div>
        <div className={styles['alert-footer']}>
          <button onClick={onClose} className={styles['alert-confirm-button']}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert; 