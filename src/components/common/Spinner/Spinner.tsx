import styles from "./Spinner.module.scss";

interface SpinnerProps {
    size?: "small" | "medium" | "large";
    color?: "primary" | "secondary" | "success" | "danger";
}

const Spinner: React.FC<SpinnerProps> = ({
    size = "small",
    color = "primary",
}) => {
    const spinnerClass = `${styles.spinner} ${styles[`size-${size}`]} ${styles[`color-${color}`]
        }`;

    return <div className={spinnerClass}></div>;
};

export default Spinner;
