import React, { useState } from "react";
import Tab from "../../components/common/Tab/Tab";
import TabPanel from "../../components/common/Tab/TabPanel";
import TabWrapper from "../../components/common/Tab/TabWrapper";
import styles from "./FindAccount.module.scss";
import { InputField } from "../../components/common/InputField/InputField";
import Button from "../../components/common/Button/Button";

const FindAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                autoComplete="email"
                className={styles['find-account-form__input-field']}
              />
              <InputField
                label="전화번호"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="-를 제외하고 입력해주세요"
                required
                autoComplete="tel"
                className={styles['find-account-form__input-field']}
                />

              <Button
                label="다음"
                onClick={() => {}}
                className={styles['find-account-form__button']}
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
      </div>
    </div>
  );
};

export default FindAccount; 