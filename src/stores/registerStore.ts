import { create } from "zustand";

interface RegisterState {
  email: string;
  emailCheckStatus: "initial" | "checked" | "duplicate";
  authCode: string;
  authCodeVerified: boolean;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  birthday: string;
  phoneNumber: string;
  error: string | null;
  setEmail: (email: string) => void;
  setEmailCheckStatus: (status: "initial" | "checked" | "duplicate") => void;
  setAuthCodeVerified: (verified: boolean) => void;
  setAuthCode: (authCode: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setName: (name: string) => void;
  setNickname: (nickname: string) => void;
  setBirthday: (birthday: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setError: (error: string | null) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  email: "",
  emailCheckStatus: "initial",
  authCode: "",
  authCodeVerified: false,
  password: "",
  confirmPassword: "",
  name: "",
  nickname: "",
  birthday: "",
  phoneNumber: "",
  error: null,
  setEmail: (email) => set({ email }),
  setEmailCheckStatus: (status) => set({ emailCheckStatus: status }),
  setAuthCodeVerified: (verified) => set({ authCodeVerified: verified }),
  setAuthCode: (authCode) => set({ authCode }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setBirthday: (birthday) => set({ birthday }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setError: (error) => set({ error }),
}));
