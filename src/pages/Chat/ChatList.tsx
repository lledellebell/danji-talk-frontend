import { useState } from 'react';
import TabWrapper from '../../components/common/Tab/TabWrapper';
import TabPanel from '../../components/common/Tab/TabPanel';
import Tab from '../../components/common/Tab/Tab';
import profileIcon from '../../assets/board/profile.svg';
import moreVerticalIcon from '../../assets/board/moreVertical.svg';
import {
  ChatRoom,
  useDirectChats,
  useGroupChats,
} from '../../services/chatService';
import styles from './ChatList.module.scss';

const OneToOneChat = () => {
  return (
    <>
      <div className={styles['one-to-one-chat']}>
        <div className={styles['one-to-one-chat-container']}>
          <div className={styles['one-to-one-chat-info']}>
            <img
              className={styles['one-to-one-chat-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['one-to-one-chat-author']}>
              <div>
                <span className={styles['one-to-one-chat-name']}>한예빈</span>
                <span className={styles['one-to-one-chat-time']}>3분 전</span>
              </div>
              <p className={styles['one-to-one-chat-content']}>
                저도 그런 이유로 입주를 고민하고 있었어요. 혹시 입주 예정일은
                언제쯤이세요?
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
      <div className={styles['one-to-one-chat']}>
        <div className={styles['one-to-one-chat-container']}>
          <div className={styles['one-to-one-chat-info']}>
            <img
              className={styles['one-to-one-chat-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['one-to-one-chat-author']}>
              <div>
                <span className={styles['one-to-one-chat-name']}>김민수</span>
                <span className={styles['one-to-one-chat-time']}>10분 전</span>
              </div>
              <p className={styles['one-to-one-chat-content']}>그런가요?ㅎㅎ</p>
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
      <div className={styles['one-to-one-chat']}>
        <div className={styles['one-to-one-chat-container']}>
          <div className={styles['one-to-one-chat-info']}>
            <img
              className={styles['one-to-one-chat-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['one-to-one-chat-author']}>
              <div>
                <span className={styles['one-to-one-chat-name']}>오세현</span>
                <span className={styles['one-to-one-chat-time']}>25.02.10</span>
              </div>
              <p className={styles['one-to-one-chat-content']}>안녕하세요</p>
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
      <div className={styles['one-to-one-chat']}>
        <div className={styles['one-to-one-chat-container']}>
          <div className={styles['one-to-one-chat-info']}>
            <img
              className={styles['one-to-one-chat-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['one-to-one-chat-author']}>
              <div>
                <span className={styles['one-to-one-chat-name']}>이진우</span>
                <span className={styles['one-to-one-chat-time']}>25.02.08</span>
              </div>
              <p className={styles['one-to-one-chat-content']}>
                아파트 관련해서 정보 좀 얻고자 연락드렸어요. 혹시 아파트 도서관
                사용을 위해 정액권을 끊어야 하나요?
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
      <div className={styles['one-to-one-chat']}>
        <div className={styles['one-to-one-chat-container']}>
          <div className={styles['one-to-one-chat-info']}>
            <img
              className={styles['one-to-one-chat-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['one-to-one-chat-author']}>
              <div>
                <span className={styles['one-to-one-chat-name']}>김재유</span>
                <span className={styles['one-to-one-chat-time']}>25.01.28</span>
              </div>
              <p className={styles['one-to-one-chat-content']}>
                정말요? 너무 유익하네요
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
    </>
  );
};

const RequestChat = () => {
  return (
    <>
      <div className={styles['chat-request']}>
        <div className={styles['chat-request-container']}>
          <div className={styles['chat-request-info']}>
            <img
              className={styles['chat-request-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['chat-request-author']}>
              <span className={styles['chat-request-name']}>
                <span className={styles['chat-request-name']}>한예빈</span>
                <span className={styles['chat-request-time']}>3분 전</span>
              </span>
              <span className={styles['chat-request-content']}>
                아파트 관련해서 정보 좀 얻고자 연락드렸어요. 혹시 아파트 도서관
                사용을 위해 정액권을 끊어야 하나요?
              </span>
            </div>
          </div>
          <div className={styles['chat-request-buttons']}>
            <span className={styles['chat-request-reject']}>거절</span>
            <div className={styles['chat-request-divider']}></div>
            <span className={styles['chat-request-accept']}>수락</span>
          </div>
        </div>
        <div className={styles['chat-request-bottom-divider']}></div>
      </div>
      <div className={styles['chat-request']}>
        <div className={styles['chat-request-container']}>
          <div className={styles['chat-request-info']}>
            <img
              className={styles['chat-request-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['chat-request-author']}>
              <span className={styles['chat-request-name']}>
                <span className={styles['chat-request-name']}>이진아</span>
                <span className={styles['chat-request-time']}>3분 전</span>
              </span>
              <span className={styles['chat-request-content']}>
                안녕하세요!
              </span>
            </div>
          </div>
          <div className={styles['chat-request-buttons']}>
            <span className={styles['chat-request-reject']}>거절</span>
            <div className={styles['chat-request-divider']}></div>
            <span className={styles['chat-request-accept']}>수락</span>
          </div>
        </div>
        <div className={styles['chat-request-bottom-divider']}></div>
      </div>
    </>
  );
};

const ResponseChat = () => {
  return (
    <>
      <div className={styles['chat-response']}>
        <div className={styles['chat-response-container']}>
          <div className={styles['chat-response-info']}>
            <img
              className={styles['chat-response-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['chat-response-author']}>
              <span className={styles['chat-response-name']}>
                <span className={styles['chat-response-name']}>한예빈</span>
                <span className={styles['chat-response-time']}>3분 전</span>
              </span>
              <span className={styles['chat-response-content']}>
                아파트 관련해서 정보 좀 얻고자 연락드렸어요. 혹시 아파트 도서관
                사용을 위해 정액권을 끊어야 하나요?
              </span>
            </div>
          </div>
          <div className={styles['chat-response-buttons']}>
            <span className={styles['chat-response-status']}>대기중</span>
            <div className={styles['chat-response-divider']}></div>
            <span className={styles['chat-response-cancel']}>취소</span>
          </div>
        </div>
        <div className={styles['chat-response-bottom-divider']}></div>
      </div>
      <div className={styles['chat-response']}>
        <div className={styles['chat-response-container']}>
          <div className={styles['chat-response-info']}>
            <img
              className={styles['chat-response-profile-img']}
              src={profileIcon}
              alt="프로필"
            />
            <div className={styles['chat-response-author']}>
              <span className={styles['chat-response-name']}>
                <span className={styles['chat-response-name']}>이진아</span>
                <span className={styles['chat-response-time']}>3분 전</span>
              </span>
              <span className={styles['chat-response-content']}>
                안녕하세요!
              </span>
            </div>
          </div>
          <div className={styles['chat-response-buttons']}>
            <span className={styles['chat-response-status']}>대기중</span>
            <div className={styles['chat-response-divider']}></div>
            <span className={styles['chat-response-cancel']}>취소</span>
          </div>
        </div>
        <div className={styles['chat-response-bottom-divider']}></div>
      </div>
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
                minute: '2-digit',
              })}
            </div>
          </div>
          <div className={styles['chat__footer']}>
            <div className={styles['chat__message']}>
              {chat.lastMessage || '새로운 채팅을 시작해보세요'}
            </div>
            {chat.unreadCount > 0 && (
              <div className={styles['chat__badge']}>{chat.unreadCount}</div>
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
          <OneToOneChat />
          <div className={styles['chat-list__container']}>
            {isDirectChatsLoading ? (
              <div className={styles['chat-list__loading']}>로딩 중...</div>
            ) : directChatsError ? (
              <div className={styles['chat-list__error']}>
                {handleError(directChatsError as Error)}
              </div>
            ) : directChats.length === 0 ? (
              <div className={styles['chat-list__empty']}>
                1:1 채팅이 없습니다
              </div>
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
              <div className={styles['chat-list__empty']}>
                단체 채팅이 없습니다
              </div>
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
          <RequestChat />
        </TabPanel>
        <TabPanel
          isActive={activeTab === 3}
          role="tabpanel"
          id="tabpanel-3"
          ariaLabelledby="tab-3"
        >
          <ResponseChat />
        </TabPanel>
      </TabWrapper>
    </div>
  );
};
