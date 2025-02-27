import React, { useState } from "react";
import Tab from "../../components/common/Tab/Tab";
import TabPanel from "../../components/common/Tab/TabPanel";
import TabWrapper from "../../components/common/Tab/TabWrapper";
import styles from "./FindAccount.module.scss";
import { InputField } from "../../components/common/InputField/InputField";
import Button from "../../components/common/Button/Button";
import { useUsers } from '../../hooks/useUsers';
import { useAccountStore } from '../../stores/useAccountStore';
import Alert from "../../components/common/Alert/Alert";

interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
}

const FindAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading } = useUsers();
  const { email, setEmail, phone, setPhone } = useAccountStore();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
  };

  const handleFindAccount = async () => {
    if (!email) {
      setEmailError('이메일을 입력하세요.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 형식이 아닙니다.');
      return;
    }

    if (!phone) {
      setPhoneError('전화번호를 입력하세요.');
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('전화번호는 숫자만 포함해야 합니다.');
      return;
    }

    setEmailError(null);
    setPhoneError(null);

    if (data) {
      const emailMatch = data.users.find((user: User) => user.email === email);
      const phoneMatch = data.users.find((user: User) => user.phone === phone);

      if (!emailMatch) {
        setAlertContent('등록된 회원정보가 없습니다.<br>다시 입력해주세요.');
        setShowAlert(true);
        return;
      }

      if (emailMatch && (!phoneMatch || emailMatch.id !== phoneMatch.id)) {
        setPhoneError('이메일은 일치하지만 전화번호가 일치하지 않습니다.');
        setAlertContent('이메일은 일치하지만 전화번호가 일치하지 않습니다.');
        setShowAlert(true);
        return;
      }

      if (emailMatch && phoneMatch && emailMatch.id === phoneMatch.id) {
        setSuccessMessage(`${emailMatch.username}님의 계정을 찾았습니다. 다음 단계로 진행하세요.`);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError('유효한 이메일 형식이 아닙니다.');
    } else {
      setEmailError(null);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    if (!validatePhone(newPhone)) {
      setPhoneError('전화번호는 숫자만 포함해야 합니다.');
    } else {
      setPhoneError(null);
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
                label="이메일"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력하세요"
                required
                autoComplete="email"
                className={styles['find-account-form__input-field']}
                error={emailError || undefined}
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
                  email && phone ? styles['button-filled'] : styles['button-empty']
                ]}
                disabled={isLoading || !email || !phone}
              />

              {successMessage && (
                <div className={styles['success-message']}>
                  {successMessage}
                </div>
              )}
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