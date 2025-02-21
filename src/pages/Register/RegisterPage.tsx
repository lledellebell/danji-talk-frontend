import { useRegisterStore } from "../../stores/registerStore";
import Header from "../../layouts/Header";
import { InputField } from "../../components/common/InputField/InputField";
import styles from "./RegisterPage.module.scss";

const SignupPrompt = () => (
  <p className={styles["signup-link"]}>
    이미 회원이신가요? <a href="/login">로그인</a>
  </p>
);

const RegisterButton = () => (
  <button type="submit" className={styles["submit-button"]}>
    {"회원가입"}
  </button>
);

const RegisterForm = ({
  onSubmit,
  error,
}: {
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
}) => {
  const {
    email,
    password,
    confirmPassword,
    name,
    nickname,
    birthday,
    phoneNumber,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    setNickname,
    setBirthday,
    setPhoneNumber,
  } = useRegisterStore();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form
      className={styles["register-form"]}
      onSubmit={onSubmit}
      style={{ margin: "20px" }}
    >
      <InputField
        label="이메일"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        actionButton={{
          label: "중복확인",
          onClick: () => console.log("클릭"),
          disabled: false,
        }}
        placeholder="4~15자 이내로 입력해주세요"
        required
        autoComplete="email"
      />
      {/* <InputField
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      />
      <InputField
        label="전화번호"
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="-제외 11자리를 입력해주세요"
        required
        autoComplete="phoneNumber"
      />
      <RegisterButton /> 
      <SignupPrompt />
      */}
    </form>
  );
};

export const RegisterPage = () => {
  const { error } = useRegisterStore();
  //   const { handleLogin, isLoading } = ();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Header title="회원가입" type="main" hasBackButton={true}></Header>
      <RegisterForm onSubmit={handleSubmit} error={error}></RegisterForm>
    </div>
  );
};
