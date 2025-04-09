import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import { useState } from 'react';

const meta = {
  title: 'Components/Common/InputField',
  component: InputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          '사용자 입력을 받는 기본 입력 필드 컴포넌트입니다. 다양한 상태와 유효성 검사를 지원합니다.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "입력 필드의 레이블 텍스트",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "필수 값" },
      },
    },
    type: {
      description: "입력 필드의 타입을 지정합니다",
      control: "select",
      options: ["text", "email", "password", "search"],
      table: {
        type: { summary: "text | email | password | search" },
        defaultValue: { summary: "text" },
      },
    },
    name: {
      description: "입력 필드의 name 속성",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "필수 값" },
      },
    },
    value: {
      description: "입력 필드의 현재 값",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "필수 값" },
      },
    },
    onChange: {
      description: "값이 변경될 때 호출되는 콜백 함수",
      table: {
        type: { summary: "(e: React.ChangeEvent<HTMLInputElement>) => void" },
        defaultValue: { summary: "필수 값" },
      },
    },
    placeholder: {
      description: "입력 필드의 플레이스홀더 텍스트",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    error: {
      description: "에러 메시지. 값이 있으면 에러 상태로 표시됩니다.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    helperText: {
      description: "입력 필드 아래에 표시되는 도움말 텍스트",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      description: "입력 필드의 비활성화 여부",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      description: "필수 입력 필드 여부",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: 'false' },
      },
    },
    showPasswordToggle: {
      description:
        '비밀번호 표시/숨기기 토글 버튼 표시 여부 (type이 password인 경우에만 적용)',
      control: 'boolean',
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: 'false' },
      },
    },
    actionButton: {
      description: "입력 필드 우측에 표시되는 액션 버튼 설정",
      table: {
        type: {
          summary:
            '{ label: string; onClick: () => void; disabled?: boolean; }',
          detail: `{
  label: string; // 버튼에 표시될 텍스트
  onClick: () => void; // 클릭 시 실행될 함수
  disabled?: boolean; // 버튼 비활성화 여부
}`,
        },
        defaultValue: { summary: "undefined" },
      },
    },
    minLength: {
      description: "입력값의 최소 길이",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    pattern: {
      description: "입력값의 정규식 패턴",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof InputField>;

const ControlledInput = (
  props: Partial<React.ComponentProps<typeof InputField>>
) => {
  const [value, setValue] = useState('');
  return (
    <InputField
      label="이메일"
      type="email"
      name="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="이메일을 입력하세요"
      aria-label="이메일 입력"
      {...props}
    />
  );
};

const ControlledPasswordInput = (
  props: Partial<React.ComponentProps<typeof InputField>>
) => {
  const [value, setValue] = useState('');
  return (
    <InputField
      label="비밀번호"
      type="password"
      name="password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="비밀번호를 입력하세요"
      aria-label="비밀번호 입력"
      {...props}
    />
  );
};

const ControlledInputWithAction = (
  props: Partial<React.ComponentProps<typeof InputField>>
) => {
  const [value, setValue] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = () => {
    setIsChecking(true);
    // 실제로는 API 호출 등의 작업을 수행
    setTimeout(() => {
      setIsChecking(false);
    }, 1000);
  };

  return (
    <InputField
      label="아이디"
      type="text"
      name="username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="아이디를 입력하세요"
      actionButton={{
        label: isChecking ? '확인 중...' : '중복확인',
        onClick: handleCheck,
        disabled: isChecking || !value,
      }}
      {...props}
    />
  );
};

export const Default: Story = {
  render: () => <ControlledInput />,
};

export const Disabled: Story = {
  render: () => <ControlledInput disabled />,
};

export const WithError: Story = {
  render: () => <ControlledInput error="잘못된 이메일 형식입니다" />,
};

export const WithHelperText: Story = {
  render: () => (
    <ControlledInput helperText="example@email.com 형식으로 입력해주세요" />
  ),
};

export const Required: Story = {
  render: () => <ControlledInput required />,
};

export const PasswordWithoutToggle: Story = {
  render: () => <ControlledPasswordInput />,
};

export const PasswordWithToggle: Story = {
  render: () => <ControlledPasswordInput showPasswordToggle />,
};

export const PasswordWithToggleAndError: Story = {
  render: () => (
    <ControlledPasswordInput
      showPasswordToggle
      error="비밀번호는 8자 이상이어야 합니다"
    />
  ),
};

export const WithActionButton: Story = {
  args: {
    disabled: false,
    label: '이메일',
  },

  render: () => <ControlledInputWithAction />,
};

export const WithActionButtonDisabled: Story = {
  render: () => <ControlledInputWithAction disabled />,
};

export const WithActionButtonAndError: Story = {
  render: () => (
    <ControlledInputWithAction error="이미 사용 중인 아이디입니다" />
  ),
};
