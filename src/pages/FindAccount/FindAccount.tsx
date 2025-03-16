import { useState, useRef, useEffect } from 'react';
import Tab from '../../components/common/Tab/Tab';
import TabPanel from '../../components/common/Tab/TabPanel';
import TabWrapper from '../../components/common/Tab/TabWrapper';
import styles from './FindAccount.module.scss';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import { useUsers } from '../../hooks/useUsers';
import { useAccountStore } from '../../stores/useAccountStore';
import Alert from '../../components/common/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';

interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
}

const validatePhone = (phone: string): string | null => {
  if (!/^\d+$/.test(phone)) {
    return '전화번호는 숫자만 포함해야 합니다.';
  }
  if (phone.length < 10 || phone.length > 11) {
    return '전화번호는 10자리 또는 11자리여야 합니다.';
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
  if (/[^a-zA-Z가-힣]/.test(username)) {
    return '이름에는 문자만 입력할 수 있습니다.';
  }
  return null;
};

const FindAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading } = useUsers();
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

    setUsernameError(null);
    setPhoneError(null);

    if (data) {
      const phoneMatch = data.users.find((user: User) => user.phone === phone);

      if (!phoneMatch) {
        setAttemptCount((prev) => prev + 1);
        setAlertContent(
          attemptCount >= 4
            ? '입력하신 정보로 등록된 계정을 찾을 수 없습니다.<br><u>회원가입</u>을 진행하시겠습니까?'
            : '입력하신 정보로 등록된 계정을 찾을 수 없습니다.<br>정보를 다시 확인하고 입력해주세요.'
        );
        setShowAlert(true);
        return;
      }

      if (phoneMatch.username !== username) {
        setAttemptCount((prev) => prev + 1);
        setAlertContent(
          '전화번호는 맞지만 이름이 틀렸습니다. 다시 확인해주세요.'
        );
        setShowAlert(true);
        return;
      }

      setUserEmail(phoneMatch.email);
      navigate('/show-email');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    setPhoneError(validatePhone(newPhone));
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
                label={isLoading ? '로딩 중...' : '다음'}
                onClick={handleFindAccount}
                className={[
                  styles['find-account-form__button'],
                  username && phone
                    ? styles['button-filled']
                    : styles['button-empty'],
                ]}
                disabled={isLoading || !username || !phone}
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
