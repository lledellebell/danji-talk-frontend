import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Common/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["button", "a"],
      description: "Button 또는 Link로 렌더링",
    },
    className: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "danger", "warning"],
      description: "버튼 스타일",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "버튼 크기",
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼 비활성화 여부",
    },
    active: {
      control: { type: "boolean" },
      description: "버튼 활성화 여부",
    },
    href: {
      control: { type: "text" },
      description: "링크 URL (as='a'일 때만 사용)",
    },
    label: {
      control: { type: "text" },
      description: "버튼 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    className: "primary",
    size: "medium",
    active: false,
    label: "Default Button",
    as: "button",
  },
};

export const Primary: Story = {
  args: {
    className: "primary",
    size: "medium",
    active: true,
    label: "Primary Button",
    as: "button",
  },
};

export const Secondary: Story = {
  args: {
    className: "secondary",
    size: "medium",
    active: true,
    label: "Secondary Button",
    as: "button",
  },
};

export const Success: Story = {
  args: {
    className: "success",
    size: "medium",
    active: true,
    label: "Success Button",
    as: "button",
  },
};

export const Danger: Story = {
  args: {
    className: "danger",
    size: "medium",
    active: true,
    label: "Danger Button",
    as: "button",
  },
};

export const Warning: Story = {
  args: {
    className: "warning",
    size: "medium",
    active: true,
    label: "Warning Button",
    as: "button",
  },
};

export const LinkButton: Story = {
  args: {
    className: "primary",
    size: "medium",
    active: false,
    label: "Link Button",
    as: "a",
    href: "https://example.com",
  },
};

export const DisabledButton: Story = {
  args: {
    className: "primary",
    size: "medium",
    active: false,
    label: "Disabled Button",
    as: "button",
    disabled: true,
  },
};

export const DisabledLinkButton: Story = {
  args: {
    className: "secondary",
    size: "medium",
    active: false,
    label: "Disabled Link Button",
    as: "a",
    href: "https://example.com",
    disabled: true,
  },
};