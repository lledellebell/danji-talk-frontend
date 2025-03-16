import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['button', 'a'],
      description: 'Button 또는 Link로 렌더링',
    },
    className: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
      description: '버튼 스타일',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 여부',
    },
    active: {
      control: { type: 'boolean' },
      description: '버튼 활성화 여부',
    },
    href: {
      control: { type: 'text' },
      description: "링크 URL (as='a'일 때 필수)",
    },
    label: {
      control: { type: 'text' },
      description: '버튼 텍스트',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const withMemoryRouter = (Story: React.ComponentType) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

export const Default: Story = {
  args: {
    size: 'medium',
    active: false,
    className: 'primary',
    label: 'Default Button',
    as: 'button',
  },
};

export const Primary: Story = {
  args: {
    size: 'medium',
    active: true,
    className: 'primary',
    label: 'Primary Button',
    as: 'button',
  },
};

export const Secondary: Story = {
  args: {
    size: 'medium',
    active: true,
    className: 'secondary',
    label: 'Secondary Button',
    as: 'button',
  },
};

export const Success: Story = {
  args: {
    size: 'medium',
    active: true,
    className: 'success',
    label: 'Success Button',
    as: 'button',
  },
};

export const Danger: Story = {
  args: {
    size: 'medium',
    active: true,
    className: 'danger',
    label: 'Danger Button',
    as: 'button',
  },
};

export const Warning: Story = {
  args: {
    active: true,
    size: 'medium',
    className: 'warning',
    label: 'Warning Button',
    as: 'button',
  },
};

export const DisabledButton: Story = {
  args: {
    className: 'primary',
    size: 'medium',
    active: false,
    label: 'Disabled Button',
    as: 'button',
    disabled: true,
  },
};

export const LinkButton: Story = {
  args: {
    className: 'primary',
    size: 'medium',
    active: false,
    label: 'Link Button',
    as: 'a',
    href: 'https://example.com',
  },
  decorators: [withMemoryRouter],
};

export const DisabledLinkButton: Story = {
  args: {
    className: 'secondary',
    size: 'medium',
    active: false,
    label: 'Disabled Link Button',
    as: 'a',
    href: '#',
    disabled: true,
  },
  decorators: [withMemoryRouter],
};
