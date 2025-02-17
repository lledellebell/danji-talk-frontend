import type { Meta, StoryObj } from "@storybook/react";
import { LoginPage } from "./LoginPage";
import { BrowserRouter } from 'react-router-dom';

// 스토어 모킹
const mockAuthStore = {
  username: 'testuser',
  password: 'password123',
  error: null,
  token: null,
  setUsername: (username: string) => { mockAuthStore.username = username; },
  setPassword: (password: string) => { mockAuthStore.password = password; },
  setError: (error: string | null) => { mockAuthStore.error = error; },
  setToken: (token: string | null) => { mockAuthStore.token = token; },
};

const meta = {
  title: "Pages/Login",
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사용자 로그인을 위한 페이지 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  name: '기본 로그인 페이지',
  args: {
    mockAuthStore: {
      ...mockAuthStore,
      error: null,
      isLoading: false,
    },
  },
};

export const WithError: Story = {
  name: '에러 상태',
  args: {
    // 에러 상태 설정
    mockAuthStore: {
      ...mockAuthStore,
      error: '로그인에 실패했습니다.',
    },
  },
};

export const Loading: Story = {
  name: '로딩 상태',
  args: {
    // 로딩 상태 설정
    mockAuthStore: {
      ...mockAuthStore,
      isLoading: true,
    },
  },
};

export const Mobile: Story = {
  name: '모바일 뷰',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  name: '태블릿 뷰',
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  name: '데스크톱 뷰',
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const PasswordError: Story = {
  name: '비밀번호 오류',
  args: {
    mockAuthStore: {
      ...mockAuthStore,
      error: '로그인에 실패했습니다.',
    },
  },
};

export const LoginSuccess: Story = {
  name: '로그인 성공',
  args: {
    mockAuthStore: {
      ...mockAuthStore,
      token: 'valid-token',
    },
  },
}; 