import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      email: '',
      password: '',
      error: null,
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setError: (error) => set({ error }),
      resetAuth: () => set({ email: '', password: '', error: null }),
      login: () => {
        set({ isLoggedIn: true, error: null });
      },
      logout: () => {
        set({ isLoggedIn: false, email: '', password: '' });
      },
      setIsLoggedIn: (value) => {
        set({ isLoggedIn: value });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    }
  )
);
