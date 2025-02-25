import Header from "../../layouts/Header";
import styles from "./RegisterPage.module.scss";
import { useRegisterStore } from "../../stores/registerStore";
import { useRegister } from "../../hooks/useRegister";
import { useCheckEmail } from "../../hooks/useCheckEmail";
import { useAuthCode } from "../../hooks/useAuthCode";
import { InputField } from "../../components/common/InputField/InputField";

const SignupPrompt = () => (
  <p className={styles["signup-link"]}>
    이미 회원이신가요? <a href="/login">로그인</a>
  </p>
);

const RegisterButton = ({ isLoading }: { isLoading: boolean }) => (
  <button type="submit" className={styles["submit-button"]}>
    {isLoading ? "회원가입 중..." : "회원가입"}
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
    password,
    confirmPassword,
    name,
    nickname,
    birthday,
    phoneNumber,
    setPassword,
    setConfirmPassword,
    setName,
    setNickname,
    setBirthday,
    setPhoneNumber,
  } = useRegisterStore();

  const { checkEmailActionButton, handleEmailChange } = useCheckEmail();
  const { authCodeActionButton, handleAuthCodeChange } = useAuthCode();

  return (
    <form className={styles["register-form"]} onSubmit={onSubmit}>
      <InputField
        label="이메일"
        name="email"
        value={email}
        onChange={handleEmailChange}
        actionButton={checkEmailActionButton}
        placeholder="4~15자 이내로 입력해주세요"
        required
        autoComplete="email"
      />
      {emailCheckStatus === "checked" && (
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
        error={error === "비밀번호가 올바르지 않습니다." ? error : undefined}
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
        error={error === "비밀번호가 올바르지 않습니다." ? error : undefined}
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
        label="생년월일"
        type="text"
        name="birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        placeholder="주민등록번호 앞 6자리를 입력해주세요"
        required
        autoComplete="birthday"
        maxLength={6}
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
      <RegisterButton isLoading={isLoading} />
    </form>
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
    <div>
      <Header title="회원가입" type="main" hasBackButton={true}></Header>
      <RegisterForm
        onSubmit={handleSubmit}
        error={error}
        isLoading={isRegistering}
      />
      <SignupPrompt />
    </div>
  );
};
