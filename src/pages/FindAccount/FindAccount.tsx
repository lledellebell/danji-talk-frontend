import React, { useState } from "react";
import Tab from "../../components/common/Tab/Tab";
import TabPanel from "../../components/common/Tab/TabPanel";
import TabWrapper from "../../components/common/Tab/TabWrapper";
import styles from "./FindAccount.module.scss";

const FindAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

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
            이메일 찾기
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