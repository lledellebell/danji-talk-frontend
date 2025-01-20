import { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Common/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Avatar 컴포넌트**는 사용자 프로필 이미지를 표시하거나, 이미지가 없는 경우 대체 텍스트 또는 플레이스홀더를 표시합니다.  
다양한 크기, 모양, 상태를 지원하며 접근성을 고려하여 설계되었습니다.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Avatar의 크기를 설정합니다.",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["circle", "rounded", "square"],
      description: "Avatar의 모양을 설정합니다.",
      table: {
        type: { summary: "circle | rounded | square" },
        defaultValue: { summary: "circle" },
      },
    },
    src: {
      control: { type: "text" },
      description: "Avatar에 표시할 이미지 URL입니다.",
      table: {
        type: { summary: "string" },
      },
    },
    alt: {
      control: { type: "text" },
      description: "이미지의 대체 텍스트입니다. 스크린 리더에서 읽힙니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Avatar" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Avatar를 비활성화 상태로 설정합니다.",
      table: {
        type: { summary: "boolean" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Avatar 클릭 시 호출되는 이벤트 핸들러입니다.",
      table: {
        type: { summary: "() => void" },
      },
    },
    ariaLabel: {
      control: { type: "text" },
      description: "접근성을 위한 라벨입니다. 스크린 리더에서 읽힙니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/150",
    alt: "기본 Avatar",
    size: "medium",
    variant: "circle",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 Avatar 컴포넌트입니다. 이미지를 표시하며, 클릭 이벤트를 지원합니다.",
      },
    },
  },
};

export const WithoutImage: Story = {
  args: {
    size: "large",
    variant: "circle",
    ariaLabel: "이미지가 없는 사용자 Avatar",
  },
  parameters: {
    docs: {
      description: {
        story: "이미지가 없는 경우, 플레이스홀더가 표시됩니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    src: "https://via.placeholder.com/150",
    alt: "비활성화된 Avatar",
    size: "medium",
    variant: "rounded",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화된 Avatar입니다. 클릭 이벤트가 비활성화됩니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Avatar src="https://via.placeholder.com/150" alt="작은 Avatar" size="small" />
      <Avatar src="https://via.placeholder.com/150" alt="중간 Avatar" size="medium" />
      <Avatar src="https://via.placeholder.com/150" alt="큰 Avatar" size="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatar의 다양한 크기(small, medium, large)를 확인할 수 있습니다.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Avatar src="https://via.placeholder.com/150" alt="원형 Avatar" variant="circle" />
      <Avatar src="https://via.placeholder.com/150" alt="둥근 Avatar" variant="rounded" />
      <Avatar src="https://via.placeholder.com/150" alt="사각형 Avatar" variant="square" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatar의 다양한 모양(circle, rounded, square)을 확인할 수 있습니다.",
      },
    },
  },
};