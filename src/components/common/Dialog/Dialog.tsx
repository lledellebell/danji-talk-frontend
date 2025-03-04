import React from "react";
import styles from "./dialog.module.scss";
import { useDialogStore } from "../../../stores/dialogStore";

export interface DialogProps {
  title: React.ReactNode;
  content: React.ReactNode;
  onClose: () => void;
  closeDialog: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  content,
  onClose,
  closeDialog,
  cancelLabel = "취소",
  confirmLabel = "확인",
}) => {
  const { isOpen } = useDialogStore();

  if (!isOpen) return null;

  return (
    <div
      className={styles["dialog-overlay"]}
      onClick={onClose}
      role="dialog"
      aria-labelledby="dialog-title"
      aria-modal="true"
    >
      <div
        className={styles["dialog-container"]}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className={styles["dialog-header"]}>
          <h2 id="dialog-title" className={styles["dialog-title"]}>
            {title}
          </h2>
        </div>
        <div className={styles["dialog-content"]}>
          <p className={styles["dialog-text"]}>{content}</p>
        </div>
        <div className={styles["dialog-footer"]}>
          <button
            onClick={onClose}
            className={styles["dialog-cancel-button"]}
            aria-label={cancelLabel}
          >
            {cancelLabel}
          </button>
          <button
            onClick={closeDialog}
            className={styles["dialog-confirm-button"]}
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
