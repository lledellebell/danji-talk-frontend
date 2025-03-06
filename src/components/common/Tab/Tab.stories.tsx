import { Meta, StoryObj } from '@storybook/react';
import TabWrapper from './TabWrapper';
import Tab from './Tab';
import TabPanel from './TabPanel';

export default {
  title: 'Components/common/Tab',
  component: TabWrapper,
  subcomponents: {
    Tab,
    TabPanel,
  },
  tags: ['autodocs', 'UI', 'navigation'],
  argTypes: {
    label: { control: 'text', description: '탭의 라벨을 설정합니다.' },
    isActive: {
      control: 'boolean',
      description: '탭이 활성화 상태인지 여부를 설정합니다.',
    },
    onClick: {
      action: 'clicked',
      description: '탭 클릭 시 호출되는 함수입니다.',
    },
    index: { control: 'number', description: '탭의 인덱스를 설정합니다.' },
  },
} as Meta;

type Story = StoryObj<typeof TabWrapper>;

export const Default: Story = {
  args: {
    children: [
      <Tab
        key="tab-1"
        index={0}
        isActive={true}
        onClick={() => {}}
        label="이메일 찾기"
        innerRef={(el) => {
          console.log(el);
        }}
      />,
      <Tab
        key="tab-2"
        index={1}
        isActive={false}
        onClick={() => {}}
        label="비밀번호 찾기"
        innerRef={(el) => {
          console.log(el);
        }}
      />,
      <TabPanel
        key="tabpanel-1"
        isActive={true}
        role="tabpanel"
        id="tabpanel-1"
        ariaLabelledby="tab-1"
      >
        이메일 찾기 내용
      </TabPanel>,
      <TabPanel
        key="tabpanel-2"
        isActive={false}
        role="tabpanel"
        id="tabpanel-2"
        ariaLabelledby="tab-2"
      >
        비밀번호 찾기 내용
      </TabPanel>,
    ],
    ariaLabel: '이메일/비밀번호 찾기',
  },
};
