import { create } from 'zustand';

export interface MenuItem {
  path: string;
  label: string;
}

interface SidebarState {
  menuItems: MenuItem[];
  isOpen: boolean;
  isClosing: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  menuItems: [
    { path: '/complex-info', label: '단지정보' },
    { path: '/community', label: '커뮤니티' },
    { path: '/notices', label: '공지사항' },
    { path: '/favorites', label: '즐겨찾기' },
    { path: '/mypage', label: '마이페이지' },
    { path: '/facilities', label: '시설정보' },
    { path: '/chat', label: '채팅' },
    { path: '/visitor-car', label: '방문차량등록' },
    { path: '/my-reservations', label: '내 예약 정보' },
    { path: '/register-complex', label: '단지 등록' },
  ],
  isOpen: false,
  isClosing: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => {
    set({ isClosing: true });
    setTimeout(() => {
      set({ isClosing: false, isOpen: false });
    }, 300);
  },
})); 