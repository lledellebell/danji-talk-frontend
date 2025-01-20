import { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={`${styles.button} ${styles[className]} ${styles[size]} ${
        isHovered ? "hover" : ""
      } ${isActive ? "active" : ""}`}
      onMouseEnter={() => setIsHovered(true)} // hover 상태 활성화
      onMouseLeave={() => setIsHovered(false)} // hover 상태 비활성화
      onMouseDown={() => setIsActive(true)} // active 상태 활성화
      onMouseUp={() => setIsActive(false)} // active 상태 비활성화
    >
      {label}
    </button>
  );
};

export default Button;
