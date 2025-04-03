import { create } from 'zustand';

interface WithdrawalState {
  step: number;
  error: string | null;
  setStep: (step: number) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

export const useWithdrawalStore = create<WithdrawalState>((set) => ({
  step: 1,
  error: null,
  setStep: (step) => set({ step, error: null }),
  setError: (error) => set({ error }),
  resetState: () => set({ step: 1, error: null })
})); 