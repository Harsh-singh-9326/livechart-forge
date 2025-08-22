import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'usd' | 'inr' | 'usdt';

export interface SettingsState {
  currency: Currency;
  theme: 'light' | 'dark';
  defaultInterval: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  setCurrency: (currency: Currency) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setDefaultInterval: (interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1d') => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'usd',
      theme: 'dark',
      defaultInterval: '1h',
      setCurrency: (currency) => set({ currency }),
      setTheme: (theme) => set({ theme }),
      setDefaultInterval: (defaultInterval) => set({ defaultInterval }),
    }),
    {
      name: 'crypto-markets-settings',
    }
  )
);