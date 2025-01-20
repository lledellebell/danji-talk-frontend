import React from "react";

type ButtonProps = {
  active?: boolean;
  label: string;
  fontSize?: string;
  backgroundColor?: string;
  activeBackColor?: string;
  activeTextColor?: string;
  textColor?: string;
  borderRadius?: string;
  border?: string;
  size?: "small" | "medium" | "large"; // 버튼 크기
};

const Button: React.FC<ButtonProps> = ({
  active,
  label,
  backgroundColor,
  activeBackColor,
  activeTextColor,
  textColor,
  borderRadius = "0px",
  border = "none",
  size = "medium", // 기본값은 medium
}) => {
  // primary 값에 따른 색상 정의
  const buttonStyle = {
    small: {
      padding: "5px 10px",
      fontSize: "12px",
    },
    medium: {
      padding: "10px 20px",
      fontSize: "14px",
    },
    large: {
      padding: "15px 30px",
      fontSize: "16px",
    },
  };

  const style = {
    ...buttonStyle[size],
    color: active ? textColor : activeTextColor,
    backgroundColor: active ? backgroundColor : activeBackColor,
    border: border,
    borderRadius: borderRadius,
    cursor: "pointer",
  };

  return <button style={style}>{label}</button>;
};

export default Button;
