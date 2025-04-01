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
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
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
        setUserEmail(response.data.email);
        navigate('/show-email');
      }
    } catch (error: unknown) {
      console.error('계정 찾기 실패:', error);
      setAttemptCount((prev) => prev + 1);
      setAlertContent(
        axios.isAxiosError(error) && error.response?.status === 404
          ? '입력하신 정보로 등록된 계정을 찾을 수 없습니다.<br><u>회원가입</u>을 진행하시겠습니까?'
          : '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
      setShowAlert(true);
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
            비밀번호 찾기
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
