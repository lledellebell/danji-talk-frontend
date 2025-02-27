import styles from './alert.module.scss';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  alertTitle: React.ReactNode;
  alertContent: React.ReactNode;
  onClose: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
}

const Alert: React.FC<AlertProps> = ({ alertTitle, alertContent, confirmLabel = '확인', onClose, onConfirm }) => {
  return (
    <div className={styles['alert__overlay']} role="alertdialog" aria-labelledby="alert__title" aria-describedby="alert__content">
      <div className={styles['alert__container']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['alert__header']}>
          <h2 id="alert__title" className={styles['alert__title']}>{alertTitle}</h2>
        </div>
        <div id="alert__content" className={styles['alert__content']}>
          <p className={styles['alert__text']} dangerouslySetInnerHTML={{ __html: alertContent as string }} />
        </div>
        <div className={styles['alert__footer']}>
          <button onClick={onConfirm || onClose} className={styles['alert__confirm-button']}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert; 