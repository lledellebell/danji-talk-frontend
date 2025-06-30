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
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }

      startTimeRef.current = Date.now();
      setProgress(100);

      const updateProgress = () => {
        if (!startTimeRef.current) return;

        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
        
        setProgress(newProgress);

        if (newProgress > 0) {
          animationFrameId.current = requestAnimationFrame(updateProgress);
        } else {
          onClose();
        }
      };

      animationFrameId.current = requestAnimationFrame(updateProgress);
    } else {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      setProgress(100);
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
