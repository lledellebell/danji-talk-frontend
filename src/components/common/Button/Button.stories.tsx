import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Common/Button", // 경로 설정
  component: Button, // 컴포넌트 지정
  tags: ["autodocs"], // 문서화를 위한 태그
};

export default meta;

type Story = StoryObj<typeof Button>;

// 버튼 스토리 정의
export const Primary: Story = {
  args: {
    active: true,
    label: "Primary Button",
    size: "medium",
    backgroundColor: "#1e90ff",
    activeBackColor: "black",
    activeTextColor: "white",
    textColor: "#ffffff",
    borderRadius: "0px",
    border: "1px solid #1e90ff",
  },
};

export const Secondary: Story = {
  args: {
    active: true,
    label: "Secondary Button",
    size: "medium",
    backgroundColor: "#f0f0f0",
    activeBackColor: "black",
    activeTextColor: "white",
    textColor: "#000000",
    borderRadius: "0px",
    border: "1px solid black",
  },
};

export const Success: Story = {
  args: {
    active: true,
    label: "Success Button",
    size: "medium",
    backgroundColor: "#28a745", // 초록색
    activeBackColor: "black",
    activeTextColor: "white",
    textColor: "#ffffff",
    borderRadius: "0px",
    border: "1px solid black",
  },
};

export const Danger: Story = {
  args: {
    active: true,
    label: "Danger Button",
    size: "medium",
    backgroundColor: "#dc3545", // 빨간색
    activeBackColor: "black",
    activeTextColor: "white",
    textColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid black",
  },
};

export const Warning: Story = {
  args: {
    active: true,
    label: "Warning Button",
    size: "medium",
    backgroundColor: "#ffc107", // 노란색
    activeBackColor: "black",
    activeTextColor: "white",
    textColor: "#000000",
    borderRadius: "10px",
    border: "1px solid black",
  },
};
