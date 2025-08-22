// Mock WebSocket client for real-time price updates
export class MockWebSocketClient {
  private callbacks: Map<string, (data: any) => void> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private connected = false;

  connect(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = true;
        console.log('Mock WebSocket connected');
        resolve();
      }, 1000);
    });
  }

  disconnect(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    this.callbacks.clear();
    this.connected = false;
    console.log('Mock WebSocket disconnected');
  }

  isConnected(): boolean {
    return this.connected;
  }

  // Subscribe to ticker updates for all symbols
  subscribeToTickers(callback: (data: { symbol: string; price: number; change24h: number }) => void): void {
    if (!this.connected) return;

    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'DOGEUSDT', 'ADAUSDT', 'AVAXUSDT', 'LINKUSDT', 'MATICUSDT'];
    
    const interval = setInterval(() => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const priceChange = (Math.random() - 0.5) * 0.002; // ±0.1% change
      const change24h = (Math.random() - 0.5) * 10; // ±5% 24h change
      
      // Simulate realistic base prices
      const basePrices: Record<string, number> = {
        BTCUSDT: 67845.23,
        ETHUSDT: 3456.78,
        BNBUSDT: 623.45,
        SOLUSDT: 234.56,
        XRPUSDT: 0.6234,
        DOGEUSDT: 0.3456,
        ADAUSDT: 0.9876,
        AVAXUSDT: 87.65,
        LINKUSDT: 23.45,
        MATICUSDT: 1.89,
      };
      
      const basePrice = basePrices[symbol] || 100;
      const newPrice = basePrice * (1 + priceChange);
      
      callback({
        symbol,
        price: newPrice,
        change24h,
      });
    }, 2000); // Update every 2 seconds

    this.intervals.set('tickers', interval);
  }

  // Subscribe to specific coin data
  subscribeToCoin(symbol: string, callback: (data: any) => void): void {
    if (!this.connected) return;

    const interval = setInterval(() => {
      const priceChange = (Math.random() - 0.5) * 0.001;
      
      callback({
        symbol,
        type: 'price',
        data: {
          price: 67845.23 * (1 + priceChange),
          volume: Math.random() * 1000,
          timestamp: Date.now(),
        },
      });
    }, 1000);

    this.intervals.set(`coin_${symbol}`, interval);
  }

  // Subscribe to order book updates
  subscribeToOrderBook(symbol: string, callback: (data: any) => void): void {
    if (!this.connected) return;

    const interval = setInterval(() => {
      // Generate mock order book update
      const basePrice = 67845.23;
      const side = Math.random() > 0.5 ? 'bid' : 'ask';
      const price = side === 'bid' 
        ? basePrice * (1 - Math.random() * 0.001)
        : basePrice * (1 + Math.random() * 0.001);
      const size = Math.random() * 10;

      callback({
        symbol,
        type: 'orderbook',
        data: {
          side,
          price,
          size,
          timestamp: Date.now(),
        },
      });
    }, 500);

    this.intervals.set(`orderbook_${symbol}`, interval);
  }

  // Subscribe to trade feed
  subscribeToTrades(symbol: string, callback: (data: any) => void): void {
    if (!this.connected) return;

    const interval = setInterval(() => {
      const basePrice = 67845.23;
      const priceVariation = (Math.random() - 0.5) * 0.002;
      
      callback({
        symbol,
        type: 'trade',
        data: {
          price: basePrice * (1 + priceVariation),
          size: Math.random() * 5 + 0.1,
          side: Math.random() > 0.5 ? 'buy' : 'sell',
          timestamp: Date.now(),
        },
      });
    }, Math.random() * 3000 + 1000); // Random interval between 1-4 seconds

    this.intervals.set(`trades_${symbol}`, interval);
  }

  unsubscribe(key: string): void {
    const interval = this.intervals.get(key);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(key);
    }
  }
}

// Singleton instance
export const wsClient = new MockWebSocketClient();