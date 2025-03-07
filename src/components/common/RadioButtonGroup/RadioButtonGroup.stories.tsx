import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RadioButtonGroup from './RadioButtonGroup';
import type { RadioButtonGroupProps } from './RadioButtonGroup';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Components/Common/RadioButtonGroup',
  component: RadioButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description:
        '라디오 버튼 그룹의 정렬 방향을 설정합니다. (수평 또는 수직)',
    },
    selectedValue: {
      control: 'text',
      description: '현재 선택된 라디오 버튼의 값입니다.',
    },
    onChange: { action: 'changed' },
    options: {
      control: 'object',
      description: '라디오 버튼 그룹에 표시될 옵션 배열입니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'RadioButtonGroup 컴포넌트는 여러 개의 라디오 버튼을 그룹화하여 사용자가 하나의 옵션을 선택할 수 있도록 합니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioButtonGroup>;

const RadioButtonGroupWrapper = (args: RadioButtonGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    args.onChange(value);
  };

  return (
    <RadioButtonGroup
      {...args}
      selectedValue={selectedValue}
      onChange={handleChange}
    />
  );
};

export const Vertical: Story = {
  render: (args) => <RadioButtonGroupWrapper {...args} />,
  args: {
    name: 'example-group',
    direction: 'vertical',
    selectedValue: 'option1',
    options: [
      { id: 'radio-1', value: 'option1', label: 'Option 1' },
      { id: 'radio-2', value: 'option2', label: 'Option 2' },
      { id: 'radio-3', value: 'option3', label: 'Option 3', disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          '수직 정렬된 라디오 버튼 그룹입니다. 기본적으로 첫 번째 옵션이 선택된 상태로 렌더링됩니다.',
      },
    },
  },
};

export const Horizontal: Story = {
  render: (args) => <RadioButtonGroupWrapper {...args} />,
  args: {
    name: 'example-group',
    direction: 'horizontal',
    selectedValue: 'option2',
    options: [
      { id: 'radio-1', value: 'option1', label: 'Option 1' },
      { id: 'radio-2', value: 'option2', label: 'Option 2' },
      { id: 'radio-3', value: 'option3', label: 'Option 3', disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          '수평 정렬된 라디오 버튼 그룹입니다. 두 번째 옵션이 선택된 상태로 렌더링됩니다.',
      },
    },
  },
};

export const WithDisabledOption: Story = {
  render: (args) => <RadioButtonGroupWrapper {...args} />,
  args: {
    name: 'example-group',
    direction: 'vertical',
    selectedValue: 'option1',
    options: [
      { id: 'radio-1', value: 'option1', label: 'Option 1' },
      { id: 'radio-2', value: 'option2', label: 'Option 2' },
      { id: 'radio-3', value: 'option3', label: 'Option 3', disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          '비활성화된 옵션이 포함된 라디오 버튼 그룹입니다. 세 번째 옵션은 선택할 수 없습니다.',
      },
    },
  },
};
