import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WatchlistState {
  ids: string[];
  addToWatchlist: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
  isInWatchlist: (coinId: string) => boolean;
  clearWatchlist: () => void;
}

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      addToWatchlist: (coinId) =>
        set((state) => ({
          ids: state.ids.includes(coinId) ? state.ids : [...state.ids, coinId],
        })),
      removeFromWatchlist: (coinId) =>
        set((state) => ({
          ids: state.ids.filter((id) => id !== coinId),
        })),
      isInWatchlist: (coinId) => get().ids.includes(coinId),
      clearWatchlist: () => set({ ids: [] }),
    }),
    {
      name: 'crypto-markets-watchlist',
    }
  )
);