import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Common/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '체크박스 컴포넌트는 사용자가 여러 옵션 중에서 선택할 수 있게 해주는 기본적인 폼 요소입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '체크박스 옆에 표시될 레이블 텍스트',
      control: 'text',
    },
    checked: {
      description: '체크박스의 선택 상태',
      control: 'boolean',
    },
    disabled: {
      description: '체크박스의 비활성화 상태',
      control: 'boolean',
    },
    size: {
      description: '체크박스의 크기',
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    onChange: {
      description: '체크박스 상태 변경 시 호출되는 함수',
      action: 'changed',
    },
  },
} as const;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: '기본 체크박스',
    checked: false,
    size: 'medium',
  },
};

export const Checked: Story = {
  args: {
    label: '선택된 체크박스',
    checked: true,
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 체크박스',
    checked: false,
    disabled: true,
    size: 'medium',
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '선택된 비활성화 체크박스',
    checked: true,
    disabled: true,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    label: '작은 체크박스',
    checked: false,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: '큰 체크박스',
    checked: false,
    size: 'large',
  },
};

export const LongLabel: Story = {
  args: {
    label: '이것은 매우 긴 레이블 텍스트입니다. 체크박스의 레이블이 길어질 때 어떻게 표시되는지 확인하기 위한 예시입니다.',
    checked: false,
    size: 'medium',
  },
};

// 여러 체크박스를 그룹으로 보여주는 예시
export const CheckboxGroup: StoryObj<typeof Checkbox> = {
  decorators: [(Story) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox
        label="옵션 1"
        checked={false}
        onChange={() => {}}
        size="medium"
      />
      <Checkbox
        label="옵션 2"
        checked={true}
        onChange={() => {}}
        size="medium"
      />
      <Checkbox
        label="옵션 3"
        checked={false}
        onChange={() => {}}
        disabled
        size="medium"
      />
    </div>
  )],
}; 