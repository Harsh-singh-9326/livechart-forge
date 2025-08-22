import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Currency } from './settings';

export interface Trade {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  currency: Currency;
  timestamp: number;
  notes?: string;
}

export interface Position {
  coinId: string;
  coinName: string;
  coinSymbol: string;
  totalQuantity: number;
  averagePrice: number;
  currency: Currency;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  totalValue: number;
}

export interface PortfolioState {
  trades: Trade[];
  positions: Position[];
  addTrade: (trade: Omit<Trade, 'id' | 'timestamp'>) => void;
  removeTrade: (tradeId: string) => void;
  updateCurrentPrices: (prices: Record<string, number>) => void;
  getTotalValue: () => number;
  getTotalPnL: () => number;
  clearPortfolio: () => void;
  calculatePositions: () => void;
}

export const usePortfolio = create<PortfolioState>()(
  persist(
    (set, get) => ({
      trades: [],
      positions: [],
      addTrade: (tradeData) => {
        const trade: Trade = {
          ...tradeData,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        };
        set((state) => ({
          trades: [...state.trades, trade],
        }));
        get().calculatePositions();
      },
      removeTrade: (tradeId) => {
        set((state) => ({
          trades: state.trades.filter((trade) => trade.id !== tradeId),
        }));
        get().calculatePositions();
      },
      updateCurrentPrices: (prices) => {
        set((state) => ({
          positions: state.positions.map((position) => {
            const currentPrice = prices[position.coinId] ?? position.currentPrice;
            const totalValue = position.totalQuantity * currentPrice;
            const costBasis = position.totalQuantity * position.averagePrice;
            const unrealizedPnL = totalValue - costBasis;
            const unrealizedPnLPercent = costBasis > 0 ? (unrealizedPnL / costBasis) * 100 : 0;
            
            return {
              ...position,
              currentPrice,
              totalValue,
              unrealizedPnL,
              unrealizedPnLPercent,
            };
          }),
        }));
      },
      getTotalValue: () => {
        return get().positions.reduce((total, position) => total + position.totalValue, 0);
      },
      getTotalPnL: () => {
        return get().positions.reduce((total, position) => total + position.unrealizedPnL, 0);
      },
      clearPortfolio: () => set({ trades: [], positions: [] }),
      calculatePositions: () => {
        const { trades } = get();
        const positionsMap = new Map<string, Position>();
        
        trades.forEach((trade) => {
          const existing = positionsMap.get(trade.coinId);
          
          if (!existing) {
            positionsMap.set(trade.coinId, {
              coinId: trade.coinId,
              coinName: trade.coinName,
              coinSymbol: trade.coinSymbol,
              totalQuantity: trade.side === 'buy' ? trade.quantity : -trade.quantity,
              averagePrice: trade.price,
              currency: trade.currency,
              currentPrice: trade.price,
              unrealizedPnL: 0,
              unrealizedPnLPercent: 0,
              totalValue: trade.quantity * trade.price,
            });
          } else {
            const newQuantity = trade.side === 'buy' 
              ? existing.totalQuantity + trade.quantity
              : existing.totalQuantity - trade.quantity;
            
            if (newQuantity > 0) {
              const totalCost = (existing.totalQuantity * existing.averagePrice) + 
                (trade.side === 'buy' ? trade.quantity * trade.price : 0);
              const newAveragePrice = totalCost / newQuantity;
              
              positionsMap.set(trade.coinId, {
                ...existing,
                totalQuantity: newQuantity,
                averagePrice: newAveragePrice,
              });
            } else if (newQuantity === 0) {
              positionsMap.delete(trade.coinId);
            } else {
              // Short position (negative quantity)
              positionsMap.set(trade.coinId, {
                ...existing,
                totalQuantity: newQuantity,
              });
            }
          }
        });
        
        set({ positions: Array.from(positionsMap.values()) });
      },
    }),
    {
      name: 'crypto-markets-portfolio',
    }
  )
);