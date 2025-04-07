import { useAuthStore } from '../../stores/authStore';
import { InputField } from '../../components/common/InputField/InputField';
import { useState, useEffect } from 'react';
import styles from './LoginPage.module.scss';
import { Checkbox } from '../../components/common/Checkbox/Checkbox';
import { useLoginMutation } from '../../hooks/useLoginMutation';
import { ArrowIcon } from '../../components/common/Icons/ArrowIcon';
import SocialLoginList from '../../components/common/List/SocialLoginList';
import Header from '../../layouts/Header';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/logo.svg';

const LoginForm = () => {
  const { email, password, error, setEmail, setPassword } = useAuthStore();
  const [saveId, setSaveId] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const loginMutation = useLoginMutation();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setSaveId(true);
    }
  }, [setEmail]);

  useEffect(() => {
    if (saveId) {
      localStorage.setItem('savedEmail', email);
    } else {
      localStorage.removeItem('savedEmail');
    }
  }, [saveId, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError) {
      loginMutation.mutate();
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <InputField
        label="이메일"
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          const newEmail = e.target.value.trim();
          setEmail(newEmail);
          if (newEmail && !isValidEmail(newEmail)) {
            setEmailError('이메일 형식이 올바르지 않습니다. 예: example@domain.com');
          } else {
            setEmailError(null);
          }
        }}
        placeholder="이메일을 입력하세요"
        required
        autoComplete="email"
        aria-invalid={emailError ? "true" : "false"}
        aria-describedby={emailError ? "email-error" : undefined}
        error={emailError ?? undefined}
      />
      <InputField
        label="비밀번호"
        id="password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        required
        autoComplete="current-password"
        aria-invalid={error === '비밀번호가 올바르지 않습니다.' ? "true" : "false"}
        aria-describedby={error ? "password-error" : undefined}
        showPasswordToggle
        error={error ?? undefined}
      />
      <LoginOptions saveId={saveId} onSaveIdChange={setSaveId} />
      <button
        type="submit"
        className={styles['login-form__submit-button']}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </button>
      <SignupPrompt />
    </form>
  );
};

const LoginOptions = ({
  saveId,
  onSaveIdChange,
}: {
  saveId: boolean;
  onSaveIdChange: (checked: boolean) => void;
}) => (
  <div className={styles['login-options']}>
    <Checkbox
      label="이메일 저장"
      checked={saveId}
      onChange={(e) => onSaveIdChange(e.target.checked)}
      className={styles['login-options__save-id-label']}
      size="medium"
    />
    <div className={styles['login-options__find-links']}>
      <Link to="/find-account">
        이메일/비밀번호 찾기 <ArrowIcon />
      </Link>
    </div>
  </div>
);

const SignupPrompt = () => (
  <p className={styles['signup-link']}>
    아직 회원이 아니신가요? <Link to="/register">회원가입</Link>
  </p>
);

const Divider = () => (
  <div className={styles['divider']}>
    <div className={styles['divider__line']}></div>
    <span className={styles['divider__text']}>Or</span>
    <div className={styles['divider__line']}></div>
  </div>
);

export const LoginPage = () => {
  return (
    <>
      <Header title="로그인" type="sub" hasBackButton={true} />
      <main className={styles['login-container']}>
        <div className={styles['login-form-wrapper']}>
          <div className={styles['logo-wrapper']}>
            <img src={LogoIcon} alt="logo" />
          </div>
          <LoginForm />
          <Divider />
          <SocialLoginList />
        </div>
      </main>
    </>
  );
};
