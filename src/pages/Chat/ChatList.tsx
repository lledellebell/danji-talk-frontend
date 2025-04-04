import { useState } from 'react';
import TabWrapper from '../../components/common/Tab/TabWrapper';
import TabPanel from '../../components/common/Tab/TabPanel';
import Tab from '../../components/common/Tab/Tab';

export const ChatList = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <TabWrapper ariaLabel="메뉴 탭">
        <Tab
          label="1:1 채팅"
          index={0}
          isActive={activeTab === 0}
          onClick={() => setActiveTab(0)}
        />
        <Tab
          label="단체 채팅"
          index={1}
          isActive={activeTab === 1}
          onClick={() => setActiveTab(1)}
        />
        <Tab
          label="받은 요청"
          index={2}
          isActive={activeTab === 2}
          onClick={() => setActiveTab(2)}
        />
        <Tab
          label="보낸 요청"
          index={3}
          isActive={activeTab === 3}
          onClick={() => setActiveTab(3)}
        />
        <TabPanel
          isActive={activeTab === 0}
          role="tabpanel"
          id="tabpanel-0"
          ariaLabelledby="tab-0"
        >
          <div>1:1 채팅</div>
        </TabPanel>
        <TabPanel
          isActive={activeTab === 1}
          role="tabpanel"
          id="tabpanel-1"
          ariaLabelledby="tab-1"
        >
          <div>단체 채팅</div>
        </TabPanel>
        <TabPanel
          isActive={activeTab === 2}
          role="tabpanel"
          id="tabpanel-2"
          ariaLabelledby="tab-2"
        >
          <div>받은 요청</div>
        </TabPanel>
        <TabPanel
          isActive={activeTab === 3}
          role="tabpanel"
          id="tabpanel-3"
          ariaLabelledby="tab-3"
        >
          <div>보낸 요청</div>
        </TabPanel>
      </TabWrapper>
    </div>
  );
};
