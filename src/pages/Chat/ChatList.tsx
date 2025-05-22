import { useState } from 'react';
import TabWrapper from '../../components/common/Tab/TabWrapper';
import TabPanel from '../../components/common/Tab/TabPanel';
import Tab from '../../components/common/Tab/Tab';
import profileIcon from '../../assets/board/profile.svg';
import moreVerticalIcon from '../../assets/board/moreVertical.svg';
import { formatDate } from '../../utils/formatDate';
import {
  ChatRoom,
  useDirectChats,
  useGroupChats,
  useRequestChats,
  useResponseChats,
} from '../../services/chatService';
import styles from './ChatList.module.scss';
import React from 'react';
import { useApproveChat } from '../../hooks/useApproveChat';
import { useRejectChat } from '../../hooks/useRejectChat';
import { useNavigate } from 'react-router-dom';

const OneToOneChat = ({ directChats }: { directChats: ChatRoom[] }) => {
  const nav = useNavigate();

  return (
    <>
      {directChats.map((chat, index) => (
        <React.Fragment key={index}>
          <div
            className={styles['one-to-one-chat']}
            onClick={() => nav(`/chatroom/${chat.chatroomId}`)}
          >
            <div className={styles['one-to-one-chat-container']}>
              <div className={styles['one-to-one-chat-info']}>
                <img
                  className={styles['one-to-one-chat-profile-img']}
                  src={profileIcon}
                  alt="프로필"
                />
                <div className={styles['one-to-one-chat-author']}>
                  <div>
                    <span className={styles['one-to-one-chat-name']}>
                      {chat.memberInformation.nickname}
                    </span>
                    <span className={styles['one-to-one-chat-time']}>
                      {formatDate(chat.messageCreatedAt)}
                    </span>
                  </div>
                  <p className={styles['one-to-one-chat-content']}>
                    {chat.chatMessage}
                  </p>
                </div>
              </div>
              <div className={styles['one-to-one-chat-buttons']}>
                <img
                  src={moreVerticalIcon}
                  alt="더보기"
                  className={styles['one-to-one-chat-more-icon']}
                />
              </div>
            </div>
          </div>
          <div className={styles['one-to-one-chat-bottom-divider']}></div>
        </React.Fragment>
      ))}
    </>
  );
};
const ResponseChat = ({ responseChats }: { responseChats: ChatRoom[] }) => {
  const { approveChat, isApproving } = useApproveChat();
  const { rejectChat, isRejecting } = useRejectChat();

  const statusMap: Record<string, string> = {
    PENDING: '처리중',
    APPROVED: '수락됨',
    REJECTED: '거절됨',
  };

  return (
    <>
      {responseChats.map((chat, idx) => {
        const statusText = statusMap[chat.status] || '알 수 없음';

        return (
          <div className={styles['chat-response']} key={idx}>
            <div className={styles['chat-response-container']}>
              <div className={styles['chat-response-info']}>
                <img
                  className={styles['chat-response-profile-img']}
                  src={profileIcon}
                  alt="프로필"
                />
                <div className={styles['chat-response-author']}>
                  <span className={styles['chat-response-name']}>
                    {chat.memberInformation.nickname}
                    <span className={styles['chat-response-time']}>
                      {formatDate(chat.createdAt)}
                    </span>
                  </span>
                  <span className={styles['chat-response-content']}>
                    {chat.message}
                  </span>
                </div>
              </div>
              <div className={styles['chat-response-buttons']}>
                {chat.status === 'PENDING' ? (
                  <>
                    <span
                      className={styles['chat-response-reject']}
                      onClick={() => rejectChat({ requestId: chat.requestId })}
                    >
                      {isRejecting ? '거절 중...' : '거절'}
                    </span>
                    <div className={styles['chat-response-divider']}></div>
                    <span
                      className={styles['chat-response-accept']}
                      onClick={() => approveChat({ requestId: chat.requestId })}
                    >
                      {isApproving ? '수락 중...' : '수락'}
                    </span>
                  </>
                ) : (
                  <span className={styles['chat-response-status']}>
                    {statusText}
                  </span>
                )}
              </div>
            </div>
            <div className={styles['chat-response-bottom-divider']}></div>
          </div>
        );
      })}
    </>
  );
};

const RequestChat = ({ requestChats }: { requestChats: ChatRoom[] }) => {
  return (
    <>
      {requestChats.map((chat, idx) => {
        const statusMap: Record<string, string> = {
          PENDING: '처리중',
          APPROVED: '수락됨',
          REJECTED: '거절됨',
        };

        const statusText = statusMap[chat.status] || '알 수 없음';

        return (
          <div key={idx} className={styles['chat-request']}>
            <div className={styles['chat-request-container']}>
              <div className={styles['chat-request-info']}>
                <img
                  className={styles['chat-request-profile-img']}
                  src={profileIcon}
                  alt="프로필"
                />
                <div className={styles['chat-request-author']}>
                  <span className={styles['chat-request-name']}>
                    {chat.memberInformation.nickname}
                    <span className={styles['chat-request-time']}>
                      {formatDate(chat.createdAt)}
                    </span>
                  </span>
                  <span className={styles['chat-request-content']}>
                    {chat.message}
                  </span>
                </div>
              </div>
              <div className={styles['chat-request-buttons']}>
                <span className={styles['chat-request-status']}>
                  {statusText}
                </span>
                {chat.status === 'PENDING' && (
                  <>
                    <div className={styles['chat-request-divider']}></div>
                    <span className={styles['chat-request-cancel']}>취소</span>
                  </>
                )}
              </div>
            </div>
            <div className={styles['chat-request-bottom-divider']}></div>
          </div>
        );
      })}
    </>
  );
};

export const ChatList = () => {
  const [activeTab, setActiveTab] = useState(0);

  const {
    data: directChats = [],
    isLoading: isDirectChatsLoading,
    error: directChatsError,
  } = useDirectChats();

  const {
    data: groupChats = [],
    isLoading: isGroupChatsLoading,
    error: groupChatsError,
  } = useGroupChats();

  const {
    data: requestChats = [],
    isLoading: isRequestChatsLoading,
    error: requestChatsError,
  } = useRequestChats();

  const {
    data: responseChats = [],
    isLoading: isResponseChatsLoading,
    error: responseChatsError,
  } = useResponseChats();

  const handleError = (error: Error) => {
    if (!error) {
      return '에러';
    }

    if (error.message.includes('인증이 필요합니다')) {
      // 로그인 페이지로 리다이렉트하거나 로그인 모달을 표시
      return '로그인이 필요한 서비스입니다.';
    }
    return error.message;
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
            ) : directChats.data.length === 0 ? (
              <div className={styles['chat-list__empty']}>
                1:1 채팅이 없습니다
              </div>
            ) : (
              <OneToOneChat directChats={directChats.data} />
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
            ) : groupChats.data.length === 0 ? (
              <div className={styles['chat-list__empty']}>
                단체 채팅이 없습니다
              </div>
            ) : (
              // groupChats.map(renderChatItem)
              <></>
            )}
          </div>
        </TabPanel>
        <TabPanel
          isActive={activeTab === 2}
          role="tabpanel"
          id="tabpanel-2"
          ariaLabelledby="tab-2"
        >
          <div className={styles['chat-list__container']}>
            {isResponseChatsLoading ? (
              <div className={styles['chat-list__loading']}>로딩 중...</div>
            ) : responseChatsError ? (
              <div className={styles['chat-list__error']}>
                {handleError(responseChatsError as Error)}
              </div>
            ) : responseChats.data.length === 0 ? (
              <div className={styles['chat-list__empty']}>
                받은 채팅이 없습니다
              </div>
            ) : (
              <ResponseChat responseChats={responseChats.data} />
            )}
          </div>
        </TabPanel>
        <TabPanel
          isActive={activeTab === 3}
          role="tabpanel"
          id="tabpanel-3"
          ariaLabelledby="tab-3"
        >
          <div className={styles['chat-list__container']}>
            {isRequestChatsLoading ? (
              <div className={styles['chat-list__loading']}>로딩 중...</div>
            ) : requestChatsError ? (
              <div className={styles['chat-list__error']}>
                {handleError(requestChatsError as Error)}
              </div>
            ) : requestChats.data.length === 0 ? (
              <div className={styles['chat-list__empty']}>
                보낸 채팅이 없습니다
              </div>
            ) : (
              <RequestChat requestChats={requestChats.data} />
            )}
          </div>
        </TabPanel>
      </TabWrapper>
    </div>
  );
};
