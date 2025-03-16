import { Meta, StoryObj } from '@storybook/react';
import Alert, { AlertProps } from './Alert';
import { useAlertStore } from '../../../stores/alertStore';

const meta: Meta<typeof Alert> = {
  title: 'Components/Common/Alert',
  component: Alert,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    confirmLabel: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<AlertProps>;

const AlertStory: React.FC<AlertProps> = (args) => {
  const { isOpen, openAlert, closeAlert } = useAlertStore();

  const handleOpen = () => {
    openAlert();
  };

  return (
    <div>
      <button onClick={handleOpen}>알림 열기</button>
      {isOpen && (
        <Alert
          {...args}
          onClose={closeAlert}
          aria-labelledby="alert-title"
          aria-describedby="alert-content"
          role="alertdialog"
        />
      )}
    </div>
  );
};

export const Default: Story = {
  args: {
    alertTitle: '알림 제목',
    alertContent: '이것은 알림 내용입니다.',
    confirmLabel: '확인',
  },
  render: (args) => <AlertStory {...args} />,
};
