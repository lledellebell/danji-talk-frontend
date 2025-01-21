import RadioButton from '../RadioButton/RadioButton';
import styles from './RadioButtonGroup.module.scss';

type RadioButtonOption = {
    id: string;
    value: string;
    label: string;
    disabled?: boolean;
};

export type RadioButtonGroupProps = {
    name: string;
    options: RadioButtonOption[];
    selectedValue: string;
    onChange: (value: string) => void;
    direction?: 'horizontal' | 'vertical';
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
    name,
    options,
    selectedValue,
    onChange,
    direction = 'vertical',
}) => {
    return (
        <div
            className={`${styles['radio-button-group']} ${
                styles[direction]
            }`}
        >
            {options.map((option) => (
                <RadioButton
                    key={option.id}
                    id={option.id}
                    name={name}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={(e) => onChange(e.target.value)}
                    label={option.label}
                    disabled={option.disabled}
                />
            ))}
        </div>
    );
};

export default RadioButtonGroup;
