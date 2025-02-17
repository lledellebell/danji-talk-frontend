import { useAuthStore } from "../../stores/authStore";
import { InputField } from "../../components/common/InputField/InputField";
import { useState, useEffect } from "react";
import styles from './LoginPage.module.scss';
import logo from '../../assets/logo.svg';
import { Checkbox } from "../../components/common/Checkbox/Checkbox";
import { useLogin } from "../../hooks/useLogin";
import { ArrowIcon } from "../../components/common/Icons/ArrowIcon";

const LoginForm = ({ onSubmit, isLoading, error }: { onSubmit: (e: React.FormEvent) => void, isLoading: boolean, error: string | null }) => {
  const { username, password, setUsername, setPassword } = useAuthStore();
  const [saveId, setSaveId] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setSaveId(true);
    }
  }, []);

  useEffect(() => {
    if (saveId) {
      localStorage.setItem('savedUsername', username);
    } else {
      localStorage.removeItem('savedUsername');
    }
  }, [saveId, username]);

  return (
    <form className={styles['login-form']} onSubmit={onSubmit}>
      <InputField
        label="아이디"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디를 입력하세요"
        required
        autoComplete="username"
        error={error === '아이디가 올바르지 않습니다. 다시 확인해주세요.' ? error : undefined}
      />
      <InputField
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        required
        autoComplete="current-password"
        showPasswordToggle
        error={error === '비밀번호가 올바르지 않습니다.' ? error : undefined}
      />
      
      <LoginOptions saveId={saveId} onSaveIdChange={setSaveId} />
      <LoginButton isLoading={isLoading} />
      <SignupPrompt />
    </form>
  );
};

const LoginOptions = ({ saveId, onSaveIdChange }: { saveId: boolean, onSaveIdChange: (checked: boolean) => void }) => (
  <div className={styles['login-options']}>
    <Checkbox
      label="아이디 저장"
      checked={saveId}
      onChange={(e) => onSaveIdChange(e.target.checked)}
      className={styles['save-id-label']}
      size="small"
    />
    <div className={styles['find-links']}>
      <a href="/find-account">아이디/비밀번호 찾기 <ArrowIcon /></a>
    </div>
  </div>
);

const LoginButton = ({ isLoading }: { isLoading: boolean }) => (
  <button 
    type="submit" 
    className={styles['submit-button']} 
    disabled={isLoading}
  >
    {isLoading ? "로그인 중..." : "로그인"}
  </button>
);

const SignupPrompt = () => (
  <p className={styles['signup-link']}>
    아직 회원이 아니신가요? <a href="/signup">회원가입</a>
  </p>
);

const Divider = () => (
  <div className={styles['divider']}>
    <div className={styles['divider-line']}></div>
    <span className={styles['divider-text']}>Or</span>
    <div className={styles['divider-line']}></div>
  </div>
);

export const LoginPage = () => {
  const { error } = useAuthStore();
  const { handleLogin, isLoading } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form-wrapper']}>
        <div className={styles['logo-wrapper']}>
          <img src={logo} alt="로고" width="200" height="204" />
        </div>
        <LoginForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
        <Divider />
      </div>
    </div>
  );
};
