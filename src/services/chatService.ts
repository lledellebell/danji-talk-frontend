import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'https://danjitalk.duckdns.org';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 401 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface ChatRoom {
  id: string;
  name: string; // 채팅방 이름
  time: string; // 채팅방 시간
  message: string; // 요청 메세지
  createdAt: string; // 요청 보낸 시간
  lastMessage?: string; // 마지막 메시지
  updatedAt: string; // 마지막 업데이트 시간
  unreadCount: number; // 읽지 않은 메시지 수
  requestId: string;
  chatroomId: string;
  chatMessage: string;
  messageCreatedAt: string;
  status: string;
  participants: { id: string; name: string; profileImage?: string }[];
  memberInformation: {
    // 참여자 정보
    id: string;
    nickname: string;
    profileImage?: string;
  };
}

export const chatKeys = {
  all: ['chats'] as const,
  wsToken: () => [...chatKeys.all, 'ws-token'] as const,

  // 1:1 채팅
  direct: () => [...chatKeys.all, 'direct'] as const,
  directRequest: () => [...chatKeys.all, 'request'] as const,
  directResponse: () => [...chatKeys.all, 'response'] as const,

  // 그룹 채팅
  group: () => [...chatKeys.all, 'group'] as const,
  room: (id: string) => [...chatKeys.all, 'room', id] as const,
};

export const chatService = {
  // 1:1 채팅 목록 조회
  getDirectChats: async () => {
    const response = await api.get('/api/chat/direct');
    return response.data;
  },

  // 단체 채팅 목록 조회
  getGroupChats: async () => {
    const response = await api.get('/api/chat/group');
    return response.data;
  },

  // 보낸 요청
  getRequestChats: async () => {
    const response = await api.get('/api/chat/request/sent');
    return response.data;
  },

  // 받은 요청
  getResponseChats: async () => {
    const response = await api.get('/api/chat/request/received');
    return response.data;
  },

  // 채팅방 상세 조회
  getChatRoomDetail: async (id: string) => {
    const response = await api.get(`/api/chat/room/${id}`);
    return response.data;
  },

  // 보낸 요청 취소
  deleteChatRequest: async (requestId: string) => {
    const response = await api.delete(`/api/chat/request/${requestId}`);
    return response.data;
  },

  getWsToken: async () => {
    const response = await api.post('/api/ws/token');
    return response.data;
  },
};

export const useDirectChats = () => {
  return useQuery({
    queryKey: chatKeys.direct(),
    queryFn: chatService.getDirectChats,
    retry: false,
  });
};

export const useGroupChats = () => {
  return useQuery({
    queryKey: chatKeys.group(),
    queryFn: chatService.getGroupChats,
    retry: false,
  });
};

export const useRequestChats = () => {
  return useQuery({
    queryKey: chatKeys.directRequest(),
    queryFn: chatService.getRequestChats,
    retry: false,
  });
};

export const useResponseChats = () => {
  return useQuery({
    queryKey: chatKeys.directResponse(),
    queryFn: chatService.getResponseChats,
    retry: false,
  });
};

export const useChatRoomDetail = (id: string) => {
  return useQuery({
    queryKey: chatKeys.room(id),
    queryFn: () => chatService.getChatRoomDetail(id),
    retry: false,
  });
};

export const useWsToken = () => {
  return useQuery({
    queryKey: [],
    queryFn: chatService.getWsToken,
    retry: false,
  });
};

export const useDeleteChatRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => chatService.deleteChatRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.directRequest() });
    },
    onError: (error) => {
      console.error('채팅 요청 삭제 실패:', error);
    },
  });
};
