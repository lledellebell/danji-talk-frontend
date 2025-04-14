import Header from '../../layouts/Header';
import styles from './RegisterPage.module.scss';
import { useDialogStore } from '../../stores/dialogStore';
import { useAlertStore } from '../../stores/alertStore';
import { useRegisterStore } from '../../stores/registerStore';
import { useRegister } from '../../hooks/useRegister';
import { useCheckEmail } from '../../hooks/useCheckEmail';
import { useAuthCode } from '../../hooks/useAuthCode';
import { InputField } from '../../components/common/InputField/InputField';
import Dialog from '../../components/common/Dialog/Dialog';
import Alert from '../../components/common/Alert/Alert';

const SignupPrompt = () => (
  <p className={styles['signup-link']}>
    이미 회원이신가요? <a href="/login">로그인</a>
  </p>
);

const RegisterButton = ({ isLoading, disabled }: { isLoading: boolean; disabled: boolean }) => (
  <button type="submit" className={styles['submit-button']} disabled={disabled || isLoading}>
    {isLoading ? '회원가입 중...' : '회원가입'}
  </button>
);

const RegisterForm = ({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}) => {
  const {
    email,
    emailCheckStatus,
    authCode,
    authCodeVerified,
    password,
    confirmPassword,
    name,
    nickname,
    phoneNumber,
    setPassword,
    setConfirmPassword,
    setName,
    setNickname,
    setPhoneNumber,
  } = useRegisterStore();

  const { checkEmailActionButton, sendEmailCode, handleEmailChange, successMessage, errorMessage } =
    useCheckEmail();
  const { authCodeActionButton, handleAuthCodeChange } = useAuthCode();
  const { closeDialog } = useDialogStore();
  const { isOpen, title, content, closeAlert } = useAlertStore();

  const isFormValid = Boolean(
    email &&
    emailCheckStatus === 'checked' &&
    authCode &&
    authCodeVerified &&
    password &&
    confirmPassword &&
    name &&
    nickname &&
    phoneNumber
  );

  return (
    <div className={styles['register-form-container']}>
      <form className={styles['register-form']} onSubmit={onSubmit}>
        <Dialog
          title="중복확인"
        content="사용 가능한 이메일입니다."
        confirmLabel="인증번호 전송"
        onClose={closeDialog}
        onConfirm={sendEmailCode}
      />
      {isOpen && (
        <Alert alertTitle={title} alertContent={content} onClose={closeAlert} />
      )}
      <InputField
        label="이메일"
        name="email"
        value={email}
        onChange={handleEmailChange}
        actionButton={checkEmailActionButton}
        placeholder="4~15자 이내로 입력해주세요"
        required
        autoComplete="email"
        success={successMessage}
        error={errorMessage}
      />
      {emailCheckStatus === 'checked' && (
        <InputField
          label="인증번호 입력"
          name="authCode"
          value={authCode}
          onChange={handleAuthCodeChange}
          actionButton={authCodeActionButton}
          placeholder="인증번호를 입력해주세요(6자리)"
          maxLength={6}
          required
        />
      )}
      <InputField
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={16}
        placeholder="영문, 숫자, 특수문자 포함 8~16자"
        required
        autoComplete="password"
        showPasswordToggle
        error={error === '비밀번호가 올바르지 않습니다.' ? error : undefined}
      />
      <InputField
        label="비밀번호 확인"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        maxLength={16}
        placeholder="영문, 숫자, 특수문자 포함 8~16자"
        required
        autoComplete="confirmPassword"
        showPasswordToggle
        error={error === '비밀번호가 올바르지 않습니다.' ? error : undefined}
      />
      <InputField
        label="이름"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력해주세요"
        required
        autoComplete="name"
      />
      <InputField
        label="닉네임"
        type="text"
        name="nickName"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임을 입력해주세요"
        required
        autoComplete="nickName"
      />
      <InputField
        label="전화번호"
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        maxLength={11}
        placeholder="-제외 11자리를 입력해주세요"
        required
        autoComplete="phoneNumber"
      />
        <RegisterButton isLoading={isLoading} disabled={!isFormValid} />
      </form>
      <SignupPrompt />
    </div>
  );
};

export const RegisterPage = () => {
  const { error } = useRegisterStore();
  const { register, isRegistering } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register();
  };

  return (
    <>
      <Header title="회원가입" type="sub" hasBackButton={true} />
      <RegisterForm
        onSubmit={handleSubmit}
        error={error}
        isLoading={isRegistering}
      />
    </>
  );
};
