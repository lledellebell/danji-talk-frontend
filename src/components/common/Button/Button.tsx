import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

type ButtonProps = {
  className: "primary" | "secondary" | "success" | "danger" | "warning";
  label: string;
  active?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  as?: "button" | "a";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  className,
  label,
  active = false,
  size = "medium",
  disabled = false,
  type = "button",
  href,
  as = "button",
  onClick,
}) => {
  const commonProps = {
    className: `${styles.button} ${styles[className]} ${styles[size]} ${
      active ? styles.active : ""
    }`,
    "aria-label": label,
    "aria-pressed": as === "button" ? active : undefined,
    tabIndex: disabled ? -1 : 0,
    onClick: !disabled ? onClick : undefined,
  };

  if (as === "a") {
    return (
      <Link
        {...commonProps}
        to={disabled ? "#" : href || "#"}
        role="button"
        aria-disabled={disabled}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      {...commonProps}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
