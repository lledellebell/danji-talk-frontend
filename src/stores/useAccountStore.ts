import { create } from 'zustand';

interface AccountState {
  email: string;
  phone: string;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  email: '',
  phone: '',
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
}));
