import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  email: string;
  password: string;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setError: (error: string | null) => void;
  resetAuth: () => void;
  login: () => void;
  logout: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  email: '',
  password: '',
  error: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setError: (error) => set({ error }),
  resetAuth: () => set({ email: '', password: '', error: null }),
  login: () => {
    localStorage.setItem('isLoggedIn', 'true');
    set({ isLoggedIn: true, error: null });
  },
  logout: () => {
    localStorage.removeItem('isLoggedIn');
    set({ isLoggedIn: false, email: '', password: '' });
  },
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));
