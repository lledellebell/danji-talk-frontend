import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dialog, { DialogProps } from './Dialog';
import { useDialogStore } from '../../../stores/dialogStore';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Common/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '다이얼로그의 제목입니다.',
    },
    content: {
      control: 'text',
      description: '다이얼로그의 내용입니다.',
    },
    onClose: { action: 'closed' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Dialog 컴포넌트는 사용자에게 정보를 표시하거나 입력을 요청하는 모달 창입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

const DialogStory: React.FC<DialogProps> = (args) => {
  const { openDialog, closeDialog } = useDialogStore();

  return (
    <div>
      <button onClick={openDialog}>다이얼로그 열기</button>
      <Dialog {...args} onClose={closeDialog} />
    </div>
  );
};

export const Default: Story = {
  args: {
    title: '기본 다이얼로그',
    content: '이것은 기본 다이얼로그입니다.',
  },
  render: (args) => <DialogStory {...args} />,
};
