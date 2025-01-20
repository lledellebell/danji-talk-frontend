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
    className: "primary",
    size: "medium",
    active: true,
    label: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    className: "secondary",
    size: "medium",
    active: true,
    label: "Secondary Button",
  },
};

export const Success: Story = {
  args: {
    className: "success",
    size: "medium",
    active: true,
    label: "Success Button",
  },
};

export const Danger: Story = {
  args: {
    className: "danger",
    size: "medium",
    active: true,
    label: "Danger Button",
  },
};

export const Warning: Story = {
  args: {
    className: "warning",
    size: "medium",
    active: true,
    label: "Warning Button",
  },
};
