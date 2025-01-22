import { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
    title: 'Components/common/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: ['small', 'medium', 'large'],
            description: '스피너의 크기를 설정합니다.',
            defaultValue: 'medium',
        },
        color: {
            control: { type: 'radio' },
            options: ['primary', 'secondary', 'success', 'danger'],
            description: '스피너의 색상을 설정합니다.',
            defaultValue: 'primary',
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
Spinner 컴포넌트는 로딩 상태를 시각적으로 표시하기 위해 사용됩니다. 
크기(size)와 색상(color)을 조정하여 다양한 스타일로 사용할 수 있습니다.
      `,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
    args: {
        size: 'medium',
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: '기본 Spinner 컴포넌트입니다. 크기는 medium, 색상은 primary로 설정되어 있습니다.',
            },
        },
    },
};

export const Small: Story = {
    args: {
        size: 'small',
        color: 'success',
    },
    parameters: {
        docs: {
            description: {
                story: '작은 크기(small)와 성공(success) 색상을 가진 Spinner 컴포넌트입니다.',
            },
        },
    },
};

export const Large: Story = {
    args: {
        size: 'large',
        color: 'danger',
    },
    parameters: {
        docs: {
            description: {
                story: '큰 크기(large)와 위험(danger) 색상을 가진 Spinner 컴포넌트입니다.',
            },
        },
    },
};
