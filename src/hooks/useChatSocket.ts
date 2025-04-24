import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

let stompClient: Client | null = null;
let subscriptions: Record<string, StompSubscription> = {};

export const connectChatSocket = (
  token: string,
  onMessage: (roomId: string, msg: string) => void
) => {
  if (stompClient && stompClient.connected) {
    console.warn('⚠️ 이미 웹소켓에 연결되어 있습니다.');
    return;
  }

  stompClient = new Client({
    brokerURL: `wss://danjitalk.duckdns.org/api/ws/chat?token=${token}`,
    reconnectDelay: 600000,
    debug: (str: string) => console.log('[STOMP]', str),

    onConnect: () => {
      console.log('🟢 STOMP connected');

      stompClient?.subscribe('/subscribe', (message: IMessage) => {
        console.log('📥 받은 구독 목록:', message.body);
        try {
          const roomIds: string[] = JSON.parse(message.body);
          roomIds.forEach((roomId) => {
            if (subscriptions[roomId]) return;

            const topicSub = stompClient!.subscribe(
              `/topic/chat/${roomId}`,
              (msg: IMessage) => {
                console.log(`💬 [${roomId}] 메시지:`, JSON.parse(msg.body));
                onMessage(roomId, msg.body);
              }
            );

            subscriptions[roomId] = topicSub;
          });
        } catch (err) {}
      });
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
  Object.values(subscriptions).forEach((sub) => sub.unsubscribe());
  subscriptions = {};
  stompClient?.deactivate();
  stompClient = null;
};

export const sendChatMessage = (roomId: string, msg: { message: string }) => {
  if (!stompClient || !stompClient.connected) {
    console.error('❌ 웹소켓이 연결되지 않았습니다.');
    return;
  }

  const message = msg.message;

  stompClient.publish({
    destination: `/pub/chat/${roomId}`,
    body: JSON.stringify({ message }),
  });
};
