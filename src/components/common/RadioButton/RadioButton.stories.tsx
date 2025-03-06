import type { Meta, StoryObj } from '@storybook/react';
import RadioButton from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/Common/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    checked: {
      control: 'boolean',
      description: '라디오 버튼이 선택되었는지 여부를 나타냅니다.',
    },
    label: {
      control: 'text',
      description: '라디오 버튼 옆에 표시될 텍스트입니다.',
    },
    disabled: {
      control: 'boolean',
      description: '라디오 버튼을 비활성화할지 여부를 설정합니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'RadioButton 컴포넌트는 사용자가 선택할 수 있는 옵션을 제공하는 UI 요소입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    id: 'radio-1',
    name: 'example',
    value: 'option1',
    checked: false,
    label: 'Option 1',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 상태의 라디오 버튼입니다. 선택되지 않은 상태로 렌더링됩니다.',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    id: 'radio-2',
    name: 'example',
    value: 'option2',
    checked: true,
    label: 'Option 2',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '선택된 상태의 라디오 버튼입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    id: 'radio-3',
    name: 'example',
    value: 'option3',
    checked: false,
    label: 'Option 3',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '비활성화된 상태의 라디오 버튼입니다. 클릭 이벤트가 발생하지 않습니다.',
      },
    },
  },
};
