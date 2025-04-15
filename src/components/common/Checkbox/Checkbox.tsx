import { ChangeEvent, useId, KeyboardEvent, useState } from 'react';
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
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const inputElement = document.getElementById(
        checkboxId
      ) as HTMLInputElement;
      if (inputElement) {
        const event = new MouseEvent('change', { bubbles: true });
        Object.defineProperty(event, 'target', {
          value: inputElement,
          enumerable: true,
        });
        onChange(event as unknown as ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const generateId = useId();
  const checkboxId = id || `checkbox-${generateId}`;

  return (
    <div
      className={`${styles.checkbox} ${className || ''} ${disabled ? styles.disabled : ''} ${styles[size]} ${isFocused ? styles.focused : ''}`}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        className={styles.input}
        disabled={disabled}
        aria-labelledby={`${checkboxId}-label`}
        onFocus={(e) => e.stopPropagation()}
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
