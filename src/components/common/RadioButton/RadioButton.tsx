import styles from './RadioButton.module.scss';

type RadioButtonProps = {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    disabled?: boolean;
};

const RadioButton: React.FC<RadioButtonProps> = ({
    id,
    name,
    value,
    checked,
    onChange,
    label,
    disabled = false,
}) => {
    return (
        <div
            className={`${styles['radio-button-container']} ${
                disabled ? styles['radio-button-disabled'] : ''
            }`}
        >
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={styles['radio-input']}
                aria-checked={checked}
                aria-disabled={disabled}
            />
            <label
                htmlFor={id}
                className={styles['radio-label']}
                aria-label={label}
            >
                {label}
            </label>
        </div>
    );
};

export default RadioButton;
