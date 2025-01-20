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
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  children?: React.ReactNode;
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
  children,
}) => {
  const commonProps = {
    className: [
      styles.button,
      styles[className],
      styles[size],
      active ? styles.active : "",
    ]
      .filter(Boolean)
      .join(" "),
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
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
      >
        {children || label}
      </Link>
    );
  }

  return (
    <button {...commonProps} type={type} disabled={disabled}>
      {children || label}
    </button>
  );
};

export default Button;
