import { useState, useRef, useEffect } from 'react';
import Tab from '../../components/common/Tab/Tab';
import TabPanel from '../../components/common/Tab/TabPanel';
import TabWrapper from '../../components/common/Tab/TabWrapper';
import styles from './FindAccount.module.scss';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import { useAccountStore } from '../../stores/useAccountStore';
import Alert from '../../components/common/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://danjitalk.duckdns.org',
  headers: {
    'Content-Type': 'application/json'
  }
});

const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return '전화번호 형식이 올바르지 않습니다. (예: 123-456-7890)';
  }
  return null;
};

const validateUsername = (username: string): string | null => {
  if (username.trim().length === 0) {
    return '이름을 입력하세요.';
  }
  if (username.length < 2) {
    return '이름은 최소 2자 이상이어야 합니다.';
  }
  if (username.length > 20) {
    return '이름은 최대 20자 이하이어야 합니다.';
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(username)) {
    return '이름에는 특수문자를 입력할 수 없습니다.';
  }
  return null;
};

const FindAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { phone, setPhone } = useAccountStore();
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState<string | null>(null);
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);
  const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);

  useEffect(() => {
    if (usernameError) {
      usernameInputRef.current?.focus();
    }
  }, [usernameError]);

  const handleFindAccount = async () => {
    const usernameValidationError = validateUsername(username);
    if (usernameValidationError) {
      setUsernameError(usernameValidationError);
      return;
    }

    const phoneValidationError = validatePhone(phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    try {
      const response = await api.post('/api/member/find-id', {
        name: username,
        phoneNumber: phone
      });

      if (response.status === 200) {
        setUserEmail(response.data.data);
        navigate('/show-email');
      }
    } catch (error: unknown) {
      console.error('계정 찾기 실패:', error);
      const is404Error = axios.isAxiosError(error) && error.response?.status === 404;
      setAttemptCount((prev) => prev + 1);
      setAlertContent(
        is404Error
          ? '입력하신 정보로 등록된 계정을 찾을 수 없습니다.<br><u>회원가입</u>을 진행하시겠습니까?'
          : '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
      setShowAlert(true);
      
      if (is404Error) {
        setTimeout(() => {
          navigate('/signup');
        }, 2000);
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    const formatted = newPhone
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    setPhone(formatted);
    setPhoneError(validatePhone(formatted));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setUsernameError(validateUsername(newUsername));
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return '유효한 이메일 주소를 입력해주세요.';
    }
    return null;
  };

  const handleRequestVerification = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      return;
    }

    try {
      console.log('인증번호 요청 중...', email);

      const response = await api.post('/api/mail/certification-code/send', {
        mail: email
      });

      console.log('서버 응답:', response);

      if (response.status === 200) {
        setIsEmailVerificationSent(true);
        setAlertContent('인증번호가 이메일로 전송되었습니다.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('인증번호 요청 실패:', error);

      if (axios.isAxiosError(error)) {
        console.log('에러 상태:', error.response?.status);
        console.log('에러 데이터:', error.response?.data);

        if (error.response?.status === 409) {
          setIsEmailVerificationSent(true);
          setAlertContent('인증번호가 이메일로 전송되었습니다.');
        } else if (error.response?.status === 404) {
          setAlertContent('가입되지 않은 이메일입니다. 회원가입을 먼저 진행해주세요.');
          setTimeout(() => {
            navigate('/signup');
          }, 2000);
        } else {
          setAlertContent(`인증번호 전송에 실패했습니다. (${error.response?.status || '알 수 없는 에러'})`);
        }
      } else {
        setAlertContent('서버와의 통신에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
      setShowAlert(true);
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      const response = await api.post('/api/member/verify-code', {
        email: email,
        code: verificationCode
      });

      if (response.status === 200) {
        setIsVerificationCodeValid(true);
        setAlertContent('인증이 완료되었습니다.');
        setShowAlert(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setVerificationCodeError('잘못된 인증번호입니다. 다시 확인해주세요.');
      } else {
        setVerificationCodeError('인증 확인 중 오류가 발생했습니다.');
      }
    }
  };

  // 비밀번호 재설정 페이지로 이동
  const handleResetPassword = () => {
    if (isVerificationCodeValid) {
      navigate('/reset-password', { state: { email } });
    }
  };

  return (
    <div className={styles['find-account-wrapper']}>
      <div className={styles['find-account-container']}>
        <TabWrapper ariaLabel="이메일/비밀번호 찾기">
          <Tab
            label="이메일 찾기"
            index={0}
            isActive={activeTab === 0}
            onClick={() => setActiveTab(0)}
          />
          <Tab
            label="비밀번호 찾기"
            index={1}
            isActive={activeTab === 1}
            onClick={() => setActiveTab(1)}
          />
          <TabPanel
            isActive={activeTab === 0}
            role="tabpanel"
            id="tabpanel-0"
            ariaLabelledby="tab-0"
          >
            <div className={styles['find-account-form']}>
              <InputField
                label="이름"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="이름을 입력하세요"
                required
                autoComplete="name"
                className={styles['find-account-form__input-field']}
                error={usernameError || undefined}
              />
              <InputField
                label="전화번호"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="-를 제외하고 입력해주세요"
                required
                autoComplete="tel"
                className={styles['find-account-form__input-field']}
                error={phoneError || undefined}
              />

              <Button
                label="다음"
                onClick={handleFindAccount}
                className={[
                  styles['find-account-form__button'],
                  username && phone ? styles['button-filled'] : styles['button-empty'],
                ]}
                disabled={!username || !phone}
              />
            </div>
          </TabPanel>
          <TabPanel
            isActive={activeTab === 1}
            role="tabpanel"
            id="tabpanel-1"
            ariaLabelledby="tab-1"
          >
            <div className={styles['find-account-form']}>
              <div className={styles['input-group']}>
                <div className={styles['input-with-button']}>
                  <InputField
                    label="이메일"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(validateEmail(e.target.value));
                    }}
                    placeholder="이메일을 입력하세요"
                    required
                    autoComplete="email"
                    className={styles['input-field']}
                    error={emailError || undefined}
                  />
                  <Button
                    label={isEmailVerificationSent ? "재요청" : "인증번호"}
                    onClick={handleRequestVerification}
                    disabled={!email || !!emailError}
                    className={`${styles['input-with-button__button']}`}
                  />
                </div>

                <div className={styles['input-with-button']}>
                  <InputField
                    label="인증번호"
                    name="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="인증번호 6자리를 입력하세요"
                    required
                    className={styles['input-field']}
                    error={verificationCodeError || undefined}
                  />
                  <Button
                    label="확인"
                    onClick={handleVerifyCode}
                    disabled={!verificationCode}
                    className={`${styles['input-with-button__button']}`}
                  />
                </div>
              </div>

              <Button
                label="다음"
                onClick={handleResetPassword}
                disabled={!isVerificationCodeValid}
                className={[
                  styles['submit-button'],
                  isVerificationCodeValid ? styles['button-filled'] : styles['button-empty']
                ]}
              />
            </div>
          </TabPanel>
        </TabWrapper>
        {showAlert && (
          <Alert
            alertTitle="안내"
            alertContent={alertContent}
            onClose={() => setShowAlert(false)}
            onConfirm={
              attemptCount >= 5 ? () => navigate('/signup') : undefined
            }
            confirmLabel={attemptCount >= 5 ? '회원 가입' : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default FindAccount;
