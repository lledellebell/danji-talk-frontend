import { useState } from 'react';
import TabWrapper from '../../components/common/Tab/TabWrapper';
import TabPanel from '../../components/common/Tab/TabPanel';
import Tab from '../../components/common/Tab/Tab';
import { ChatRoom, useDirectChats, useGroupChats } from '../../services/chatService';
import styles from './ChatList.module.scss';

export const ChatList = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const { 
    data: directChats = [], 
    isLoading: isDirectChatsLoading,
    error: directChatsError
  } = useDirectChats();
  
  const { 
    data: groupChats = [], 
    isLoading: isGroupChatsLoading,
    error: groupChatsError
  } = useGroupChats();

  const handleError = (error: Error) => {
    if (error.message.includes('인증이 필요합니다')) {
      // 로그인 페이지로 리다이렉트하거나 로그인 모달을 표시
      return '로그인이 필요한 서비스입니다.';
    }
    return error.message;
  };

  const renderChatItem = (chat: ChatRoom) => {
    const participant = chat.participants[0];

    return (
      <div key={chat.id} className={styles['chat']}>
        <div className={styles['chat__avatar']}>
          {participant.profileImage ? (
            <img 
              src={participant.profileImage} 
              alt={participant.name} 
              className={styles['chat__avatar-image']}
            />
          ) : (
            <div className={styles['chat__avatar-placeholder']}>
              {participant.name.charAt(0)}
            </div>
          )}
        </div>
        <div className={styles['chat__content']}>
          <div className={styles['chat__header']}>
            <div className={styles['chat__name']}>
              {chat.name || participant.name}
            </div>
            <div className={styles['chat__time']}>
              {new Date(chat.updatedAt).toLocaleString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <div className={styles['chat__footer']}>
            <div className={styles['chat__message']}>
              {chat.lastMessage || '새로운 채팅을 시작해보세요'}
            </div>
            {chat.unreadCount > 0 && (
              <div className={styles['chat__badge']}>
                {chat.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles['chat-list']}>
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
          <div className={styles['chat-list__container']}>
            {isDirectChatsLoading ? (
              <div className={styles['chat-list__loading']}>로딩 중...</div>
            ) : directChatsError ? (
              <div className={styles['chat-list__error']}>
                {handleError(directChatsError as Error)}
              </div>
            ) : directChats.length === 0 ? (
              <div className={styles['chat-list__empty']}>1:1 채팅이 없습니다</div>
            ) : (
              directChats.map(renderChatItem)
            )}
          </div>
        </TabPanel>
        
        <TabPanel
          isActive={activeTab === 1}
          role="tabpanel"
          id="tabpanel-1"
          ariaLabelledby="tab-1"
        >
          <div className={styles['chat-list__container']}>
            {isGroupChatsLoading ? (
              <div className={styles['chat-list__loading']}>로딩 중...</div>
            ) : groupChatsError ? (
              <div className={styles['chat-list__error']}>
                {handleError(groupChatsError as Error)}
              </div>
            ) : groupChats.length === 0 ? (
              <div className={styles['chat-list__empty']}>단체 채팅이 없습니다</div>
            ) : (
              groupChats.map(renderChatItem)
            )}
          </div>
        </TabPanel>
        
        <TabPanel
          isActive={activeTab === 2}
          role="tabpanel"
          id="tabpanel-2"
          ariaLabelledby="tab-2"
        >
          <div className={styles['chat-list__container']}>받은 요청</div>
        </TabPanel>
        
        <TabPanel
          isActive={activeTab === 3}
          role="tabpanel"
          id="tabpanel-3"
          ariaLabelledby="tab-3"
        >
          <div className={styles['chat-list__container']}>보낸 요청</div>
        </TabPanel>
      </TabWrapper>
    </div>
  );
};
