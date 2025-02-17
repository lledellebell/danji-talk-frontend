import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";
import { describe, it, expect } from '@storybook/test';

describe("InputField Component", () => {
  const defaultProps = {
    label: '이메일',
    name: 'email',
    value: '',
    onChange: jest.fn(),
  };

  it("renders correctly with label", () => {
    render(<InputField {...defaultProps} />);
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    const errorMessage = '잘못된 이메일 형식입니다';
    render(<InputField {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("calls onChange handler when input value changes", () => {
    render(<InputField {...defaultProps} />);
    const input = screen.getByLabelText('이메일');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("displays placeholder text correctly", () => {
    render(<InputField {...defaultProps} placeholder="이메일을 입력하세요" />);
    expect(screen.getByPlaceholderText('이메일을 입력하세요')).toBeInTheDocument();
  });

  it("disables input when disabled prop is true", () => {
    render(<InputField {...defaultProps} disabled />);
    expect(screen.getByLabelText('이메일')).toBeDisabled();
  });

  it("marks input as required when required prop is true", () => {
    render(<InputField {...defaultProps} required />);
    expect(screen.getByLabelText('이메일')).toBeRequired();
  });
});

describe('Password Input Field', () => {
  const passwordProps = {
    label: '비밀번호',
    name: 'password',
    type: 'password' as const,
    value: '',
    onChange: jest.fn(),
  };

  it('renders password field without toggle button by default', () => {
    render(<InputField {...passwordProps} />);
    const input = screen.getByLabelText('비밀번호');
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders password field with toggle button when showPasswordToggle is true', () => {
    render(<InputField {...passwordProps} showPasswordToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles password visibility when toggle button is clicked', () => {
    render(<InputField {...passwordProps} showPasswordToggle />);
    const input = screen.getByLabelText('비밀번호');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });
});
