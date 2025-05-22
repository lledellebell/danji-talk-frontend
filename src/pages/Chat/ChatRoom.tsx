import Header from '../../layouts/Header';
import styles from './ChatRoom.module.scss';
import profileIcon from '../../assets/board/profile.svg';
import { formatDate } from '../../utils/formatDate';
import { useParams } from 'react-router-dom';
import { useChatRoomDetail } from '../../services/chatService';
import { useEffect, useState } from 'react';
import {
  connectChatSocket,
  disconnectChatSocket,
  sendChatMessage,
} from '../../hooks/useChatSocket';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  chatroomId: number;
  sender: {
    id: number;
    nickname: string;
    profileUrl: string | null;
  };
  message: string;
  imageUrl: string;
  createdAt: string;
}

interface MemberInfo {
  id: number;
  nickname: string;
  profileUrl: string | null;
}

interface Props {
  message: ChatMessage;
}

const ChatNotice = () => (
  <div className={styles['notice-box']}>
    <p className={styles['notice-box__text']}>
      대화는 상대방이 수락하면 시작됩니다. <br />
      불편한 대화가 이어질 경우, 언제든지 대화를 종료될 수 있으니 함께 편안한
      대화를 나눌 수 있도록 배려해주세요.
    </p>
  </div>
);

const ChatDateBadge = () => {
  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(today);

  return (
    <div className={styles['date-badge']}>
      <p className={styles['date-badge__text']}>{formattedDate}</p>
    </div>
  );
};

const ChatInput = ({ roomId }: { roomId: string }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendChatMessage(roomId, { message: trimmed });
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={styles['chat-input']}>
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        className={styles['chat-input__field']}
      />
      <button className={styles['chat-input__button']} onClick={handleSend}>
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M8.74987 10H4.16653M4.09599 10.2429L2.15022 16.0552C1.99736 16.5118 1.92093 16.7401 1.97578 16.8807C2.02341 17.0028 2.12571 17.0954 2.25195 17.1306C2.39731 17.1712 2.61687 17.0724 3.05598 16.8748L16.9822 10.608C17.4108 10.4151 17.6251 10.3186 17.6913 10.1847C17.7489 10.0683 17.7489 9.93173 17.6913 9.81534C17.6251 9.68137 17.4108 9.58493 16.9822 9.39206L3.05112 3.12311C2.61334 2.92611 2.39444 2.82761 2.24922 2.86801C2.12311 2.90311 2.02082 2.99543 1.97302 3.1173C1.91798 3.25762 1.9936 3.48544 2.14482 3.94107L4.09653 9.82128C4.1225 9.89954 4.13549 9.93866 4.14062 9.97868C4.14517 10.0142 4.14512 10.0501 4.14048 10.0856C4.13525 10.1256 4.12216 10.1647 4.09599 10.2429Z"
            stroke="#97BBFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

const LeftBubble = ({ message }: Props) => (
  <div className={styles['left-bubble']}>
    <img
      className={styles['left-bubble__avatar']}
      src={message.sender.profileUrl || profileIcon}
      alt="avatar"
    />
    <div className={styles['left-bubble__content-wrapper']}>
      <div className={styles['left-bubble__bubble']}>
        <svg
          className={styles['left-bubble__bubble-background']}
          viewBox="0 0 207 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M7.87215 7.11198C7.85164 3.28854 10.911 0.160208 14.734 0.0954919L20.3749 0H32.8166H57.6999H107.467H199C203.418 0 207 3.58172 207 8V66C207 70.4183 203.418 74 199 74H15.9332C11.5149 74 7.93322 70.4183 7.93322 66V37V21.0623C7.93322 19.5006 7.02431 18.0817 5.60564 17.4287L1.9375 15.7404C0.387393 15.0269 0.385322 12.8247 1.93409 12.1084L5.84734 10.2983C7.08805 9.72439 7.87948 8.47897 7.87215 7.11198Z"
            fill="#EAF1FF"
          />
        </svg>
        <p className={styles['left-bubble__bubble-text']}>{message.message}</p>
      </div>
      <p className={styles['left-bubble__time']}>
        {formatDate(message.createdAt)}
      </p>
    </div>
  </div>
);

const RightBubble = ({ message }: Props) => (
  <div className={styles['right-bubble']}>
    <p className={styles['right-bubble__time']}>
      {formatDate(message.createdAt)}
    </p>
    <div className={styles['right-bubble__bubble']}>
      <svg
        className={styles['right-bubble__bubble-background']}
        viewBox="0 0 94 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M88 6.31969C88 2.82942 85.1706 0 81.6803 0H8.96928C4.551 0 0.969284 3.58172 0.969284 8V36C0.969284 40.4183 4.551 44 8.96928 44H80C84.4183 44 88 40.4183 88 36V16.3651C88 14.9063 88.7941 13.5632 90.0723 12.8602L92.814 11.3523C94.4908 10.4301 94.0393 7.9059 92.1468 7.62202L88.6728 7.10092C88.2861 7.04291 88 6.71072 88 6.31969Z"
          fill="#97BBFF"
        />
      </svg>
      <p className={styles['right-bubble__bubble-text']}>{message.message}</p>
    </div>
  </div>
);

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const {
    data: directChats = [],
    isLoading: isDirectChatsLoading,
    error: directChatsError,
  } = useChatRoomDetail(roomId!);

  useEffect(() => {
    if (directChats?.data?.chatMessageResponses) {
      setMessages(directChats.data.chatMessageResponses);
    }
  }, [directChats]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    console.log('📡 채팅 소켓 연결 시도:', roomId);

    connectChatSocket((roomId, msg: string) => {
      const parsedMsg: ChatMessage = JSON.parse(msg);
      console.log('📩 받은 메시지:', parsedMsg, roomId);
      setMessages((prev) => [...prev, parsedMsg]);
    });

    return () => {
      disconnectChatSocket();
      console.log('❌ 채팅 소켓 연결 종료:', roomId);
    };
  }, [roomId]);

  // 로딩 중인 경우
  if (isDirectChatsLoading) return <div>로딩 중...</div>;

  // 에러 처리
  if (directChatsError)
    return <div>채팅 데이터를 불러오는 데 실패했습니다.</div>;

  const myId = directChats?.data?.memberInformationList?.[0].id;
  const information = directChats?.data?.memberInformationList?.find(
    (member: MemberInfo) => member.id !== myId
  );

  const nav = useNavigate();

  return (
    <>
      <Header
        title={information?.nickname ?? '채팅방'}
        type="sub"
        hasBackButton={true}
        hasRightButton={true}
        buttonText="나가기"
        onClickButton={() => nav(-1)}
      />
      <ChatNotice />
      <ChatDateBadge />
      <div className={styles['bubble-container']}>
        {messages.map((msg) =>
          msg.sender.id === myId ? (
            <RightBubble key={msg.id} message={msg} />
          ) : (
            <LeftBubble key={msg.id} message={msg} />
          )
        )}
      </div>
      <ChatInput roomId={roomId!} />
    </>
  );
};

export default ChatRoom;
