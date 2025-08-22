import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PriceAlert {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  operator: '>' | '<';
  targetPrice: number;
  currentPrice: number;
  createdAt: number;
  triggered: boolean;
}

export interface AlertsState {
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'triggered'>) => void;
  removeAlert: (alertId: string) => void;
  triggerAlert: (alertId: string) => void;
  updateCurrentPrices: (prices: Record<string, number>) => void;
  clearTriggeredAlerts: () => void;
}

export const useAlerts = create<AlertsState>()(
  persist(
    (set, get) => ({
      alerts: [],
      addAlert: (alertData) => {
        const alert: PriceAlert = {
          ...alertData,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          triggered: false,
        };
        set((state) => ({
          alerts: [...state.alerts, alert],
        }));
      },
      removeAlert: (alertId) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== alertId),
        })),
      triggerAlert: (alertId) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === alertId ? { ...alert, triggered: true } : alert
          ),
        })),
      updateCurrentPrices: (prices) =>
        set((state) => ({
          alerts: state.alerts.map((alert) => ({
            ...alert,
            currentPrice: prices[alert.coinId] ?? alert.currentPrice,
          })),
        })),
      clearTriggeredAlerts: () =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => !alert.triggered),
        })),
    }),
    {
      name: 'crypto-markets-alerts',
    }
  )
);