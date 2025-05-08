import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

let stompClient: Client | null = null;
let subscription: any = null;

export const connectChatSocket = (
  roomId: string,
  onMessage: (msg: string) => void
) => {
  if (stompClient && stompClient.connected) {
    console.warn('⚠️ 이미 웹소켓에 연결되어 있습니다.');
    return;
  }

  stompClient = new Client({
    brokerURL: 'wss://danjitalk.duckdns.org/api/ws/chat',
    reconnectDelay: 5000,
    debug: (str: string) => console.log('[STOMP]', str),
    onConnect: () => {
      console.log('🟢 STOMP connected');

      // 기존 구독이 있으면 해제
      if (subscription) {
        subscription.unsubscribe();
      }

      subscription = stompClient?.subscribe(
        `/subscribe`, // ✅ 실제 서버 푸시 경로에 맞게 수정
        (message: IMessage) => {
          console.log('📥 Received message:', message.body);
          onMessage(message.body);
        }
      );
    },
    onStompError: (frame) => {
      console.error('❌ STOMP error:', frame);
    },
    onWebSocketClose: () => {
      console.warn('🔌 WebSocket connection closed');
    },
  });

  stompClient.activate();
};

export const disconnectChatSocket = () => {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }

  stompClient?.deactivate();
  stompClient = null;
};

export const sendChatMessage = (roomId: string, message: string) => {
  if (!stompClient || !stompClient.connected) {
    console.error('❌ 웹소켓이 연결되지 않았습니다.');
    return;
  }

  stompClient.publish({
    destination: `/pub/chat/${roomId}`,
    body: JSON.stringify({ message }),
  });
};
