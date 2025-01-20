import styles from "./Button.module.scss"; // CSS Module import

type ButtonProps = {
  className: "primary" | "secondary" | "success" | "danger" | "warning";
  active?: boolean;
  label: string;
  size?: "small" | "medium" | "large"; // 버튼 크기
};

const Button: React.FC<ButtonProps> = ({
  className,
  label,
  size = "medium", // 기본값은 medium
}) => {
  return (
    <button
      className={`${styles.button} ${styles[className]} ${styles[size]} `}
    >
      {label}
    </button>
  );
};

export default Button;
