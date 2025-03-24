import { ChangeEvent, useId } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  className,
  id,
  disabled = false,
  size = 'medium',
}: CheckboxProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(e as unknown as ChangeEvent<HTMLInputElement>);
    }
  };

  const generateId = useId();
  const checkboxId = id || `checkbox-${generateId}`;

  return (
    <div
      className={`${styles.checkbox} ${className || ''} ${disabled ? styles.disabled : ''} ${styles[size]}`}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={0}
      onKeyPress={handleKeyPress}
    >
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        className={styles.input}
        disabled={disabled}
        aria-labelledby={`${checkboxId}-label`}
      />
      <label
        id={`${checkboxId}-label`}
        htmlFor={checkboxId}
        className={styles.label}
      >
        <span className={styles.checkmark}></span>
        {label}
      </label>
    </div>
  );
};
