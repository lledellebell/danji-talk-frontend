import { useEffect, useRef, useState } from 'react';
import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  const [progress, setProgress] = useState(100);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const update = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(newProgress);

        if (now < endTime) {
          animationFrameId.current = requestAnimationFrame(update);
        } else {
          setProgress(0);
          onClose();
        }
      };

      setProgress(100);
      animationFrameId.current = requestAnimationFrame(update);
    }

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.toast__content}>
        <span className={styles.toast__message}>{message}</span>
      </div>
      <div className={styles.toast__progress}>
        <div
          className={styles.toast__progress__bar}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
