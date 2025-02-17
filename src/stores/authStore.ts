import { create } from "zustand";
interface AuthState {
  username: string;
  password: string;
  isLoggedIn: boolean;
  error: string | null;
  token: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  login: () => void;
  logout: () => void;
  setError: (error: string | null) => void;
  setToken: (token: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  username: '',
  password: '',
  isLoggedIn: false,
  error: null,
  token: null,
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  login: () => set({ isLoggedIn: true, error: null }),
  logout: () => set({ 
    isLoggedIn: false, 
    username: '', 
    password: '', 
    error: null 
  }),
  setError: (error) => set({ error }),
  setToken: (token) => set({ token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));