import { create } from "zustand";
interface AuthState {
  email: string;
  password: string;
  isLoggedIn: boolean;
  error: string | null;
  token: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => void;
  logout: () => void;
  setError: (error: string | null) => void;
  setToken: (token: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  isLoggedIn: false,
  error: null,
  token: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  login: () => set({ isLoggedIn: true, error: null }),
  logout: () => set({ 
    isLoggedIn: false, 
    email: '', 
    password: '', 
    error: null 
  }),
  setError: (error) => set({ error }),
  setToken: (token) => set({ token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));