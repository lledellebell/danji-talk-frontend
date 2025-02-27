import { useState, useRef } from "react";
import Tab from "../../components/common/Tab/Tab";
import TabPanel from "../../components/common/Tab/TabPanel";
import TabWrapper from "../../components/common/Tab/TabWrapper";
import styles from "./FindAccount.module.scss";
import InputField from "../../components/common/InputField/InputField";
import Button from "../../components/common/Button/Button";
import { useUsers } from '../../hooks/useUsers';
import { useAccountStore } from '../../stores/useAccountStore';
import Alert from "../../components/common/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { useUserStore } from '../../stores/userStore';

interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
}

const validatePhone = (phone: string): boolean => /^\d+$/.test(phone);
const validateUsername = (username: string): string | null => 
  username.trim().length === 0 ? '이름을 입력하세요.' : null;

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

  const handleFindAccount = async () => {
    const usernameValidationError = validateUsername(username);
    if (usernameValidationError) {
      setUsernameError(usernameValidationError);
      usernameInputRef.current?.focus();
      return;
    }

    if (!phone || !validatePhone(phone)) {
      setPhoneError('전화번호는 숫자만 포함해야 합니다.');
      return;
    }

    setUsernameError(null);
    setPhoneError(null);

    if (data) {
      const usernameMatch = data.users.find((user: User) => user.username === username);
      const phoneMatch = data.users.find((user: User) => user.phone === phone);

      if (!usernameMatch || (usernameMatch && (!phoneMatch || usernameMatch.id !== phoneMatch.id))) {
        setAttemptCount(prev => prev + 1);
        setAlertContent(attemptCount >= 4 
          ? '등록된 회원정보가 없습니다.<br>회원 가입을 진행하시겠습니까?' 
          : '등록된 회원정보가 없습니다.<br>다시 입력해주세요.');
        setShowAlert(true);
        if (attemptCount >= 4) navigate('/signup');
        return;
      }

      setUserEmail(usernameMatch.email);
      navigate('/show-email');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    setPhoneError(validatePhone(newPhone) ? null : '전화번호는 숫자만 포함해야 합니다.');
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
                label={isLoading ? "로딩 중..." : "다음"}
                onClick={handleFindAccount}
                className={[
                  styles['find-account-form__button'],
                  username && phone ? styles['button-filled'] : styles['button-empty']
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
          />
        )}
      </div>
    </div>
  );
};

export default FindAccount; 