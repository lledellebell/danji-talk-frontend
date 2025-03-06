import { create } from 'zustand';

interface UserState {
  userId: string | null;
  userEmail: string | null;
  setUserId: (id: string) => void;
  setUserEmail: (email: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  userEmail: null,
  setUserId: (id: string) => set({ userId: id }),
  setUserEmail: (email: string) => set({ userEmail: email }),
}));
