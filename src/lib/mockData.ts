export interface CoinData {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change24hPct: number;
  high24h: number;
  low24h: number;
  marketCap: number;
  volume24h: number;
  sparkline7d: number[];
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  description?: string;
  website?: string;
  explorer?: string;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  cumulative: number;
}

export interface Trade {
  id: string;
  price: number;
  size: number;
  time: number;
  side: 'buy' | 'sell';
}

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Mock exchange rates
export const mockFxRates = {
  usd: 1,
  inr: 83.25,
  usdt: 1.001,
};

// Generate realistic sparkline data
const generateSparkline = (basePrice: number, volatility: number = 0.05): number[] => {
  const points = [];
  let price = basePrice;
  
  for (let i = 0; i < 168; i++) { // 7 days * 24 hours
    const change = (Math.random() - 0.5) * volatility;
    price = Math.max(0.01, price * (1 + change));
    points.push(price);
  }
  
  return points;
};

// Generate order book data
export const generateOrderBook = (basePrice: number): {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
} => {
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  
  let cumBids = 0;
  let cumAsks = 0;
  
  // Generate bids (buy orders below current price)
  for (let i = 0; i < 20; i++) {
    const price = basePrice * (1 - (i + 1) * 0.001);
    const size = Math.random() * 10 + 1;
    cumBids += size;
    bids.push({ price, size, cumulative: cumBids });
  }
  
  // Generate asks (sell orders above current price)
  for (let i = 0; i < 20; i++) {
    const price = basePrice * (1 + (i + 1) * 0.001);
    const size = Math.random() * 10 + 1;
    cumAsks += size;
    asks.push({ price, size, cumulative: cumAsks });
  }
  
  return { bids: bids.reverse(), asks };
};

// Generate recent trades
export const generateTrades = (basePrice: number): Trade[] => {
  const trades: Trade[] = [];
  let time = Date.now();
  
  for (let i = 0; i < 50; i++) {
    const priceVariation = (Math.random() - 0.5) * 0.002;
    const price = basePrice * (1 + priceVariation);
    const size = Math.random() * 5 + 0.1;
    const side = Math.random() > 0.5 ? 'buy' : 'sell';
    
    trades.push({
      id: `trade-${i}`,
      price,
      size,
      time: time - i * 1000 * Math.random() * 60, // Random times within last hour
      side,
    });
  }
  
  return trades.sort((a, b) => b.time - a.time);
};

// Generate candlestick data
export const generateCandleData = (
  basePrice: number,
  interval: string,
  count: number = 200
): CandleData[] => {
  const candles: CandleData[] = [];
  let currentPrice = basePrice;
  const intervalMs = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000,
  }[interval] || 60 * 60 * 1000;
  
  let time = Date.now() - count * intervalMs;
  
  for (let i = 0; i < count; i++) {
    const open = currentPrice;
    const volatility = 0.02;
    
    const high = open * (1 + Math.random() * volatility);
    const low = open * (1 - Math.random() * volatility);
    const close = low + Math.random() * (high - low);
    const volume = Math.random() * 1000 + 100;
    
    candles.push({
      time: time + i * intervalMs,
      open,
      high,
      low,
      close,
      volume,
    });
    
    currentPrice = close;
  }
  
  return candles;
};

// Mock cryptocurrency data
export const mockCoins: CoinData[] = [
  {
    id: 'bitcoin',
    rank: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    price: 67845.23,
    change24hPct: 2.34,
    high24h: 68952.41,
    low24h: 66231.85,
    marketCap: 1331520000000,
    volume24h: 28459000000,
    sparkline7d: generateSparkline(67845.23, 0.03),
    circulatingSupply: 19625000,
    totalSupply: 19625000,
    maxSupply: 21000000,
    description: "Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by Satoshi Nakamoto.",
    website: "https://bitcoin.org",
    explorer: "https://blockchair.com/bitcoin",
  },
  {
    id: 'ethereum',
    rank: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    price: 3456.78,
    change24hPct: -1.23,
    high24h: 3521.45,
    low24h: 3398.12,
    marketCap: 415680000000,
    volume24h: 18234000000,
    sparkline7d: generateSparkline(3456.78, 0.04),
    circulatingSupply: 120280000,
    totalSupply: 120280000,
    maxSupply: null,
    description: "Ethereum is a decentralized platform that runs smart contracts applications that run exactly as programmed.",
    website: "https://ethereum.org",
    explorer: "https://etherscan.io",
  },
  {
    id: 'binancecoin',
    rank: 3,
    symbol: 'BNB',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    price: 623.45,
    change24hPct: 0.89,
    high24h: 631.22,
    low24h: 618.77,
    marketCap: 90560000000,
    volume24h: 2145000000,
    sparkline7d: generateSparkline(623.45, 0.035),
    circulatingSupply: 145315000,
    totalSupply: 145315000,
    maxSupply: 200000000,
  },
  {
    id: 'solana',
    rank: 4,
    symbol: 'SOL',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    price: 234.56,
    change24hPct: 4.21,
    high24h: 241.33,
    low24h: 226.78,
    marketCap: 109850000000,
    volume24h: 5678000000,
    sparkline7d: generateSparkline(234.56, 0.05),
    circulatingSupply: 468290000,
    totalSupply: 585870000,
    maxSupply: null,
  },
  {
    id: 'ripple',
    rank: 5,
    symbol: 'XRP',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
    price: 0.6234,
    change24hPct: -2.56,
    high24h: 0.6489,
    low24h: 0.6123,
    marketCap: 35420000000,
    volume24h: 1234000000,
    sparkline7d: generateSparkline(0.6234, 0.04),
    circulatingSupply: 56840000000,
    totalSupply: 99990000000,
    maxSupply: 100000000000,
  },
  {
    id: 'dogecoin',
    rank: 6,
    symbol: 'DOGE',
    name: 'Dogecoin',
    image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
    price: 0.3456,
    change24hPct: 8.91,
    high24h: 0.3621,
    low24h: 0.3198,
    marketCap: 50860000000,
    volume24h: 4521000000,
    sparkline7d: generateSparkline(0.3456, 0.08),
    circulatingSupply: 147130000000,
    totalSupply: 147130000000,
    maxSupply: null,
  },
  {
    id: 'cardano',
    rank: 7,
    symbol: 'ADA',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    price: 0.9876,
    change24hPct: -0.67,
    high24h: 1.0045,
    low24h: 0.9654,
    marketCap: 34560000000,
    volume24h: 876000000,
    sparkline7d: generateSparkline(0.9876, 0.035),
    circulatingSupply: 35000000000,
    totalSupply: 45000000000,
    maxSupply: 45000000000,
  },
  {
    id: 'avalanche-2',
    rank: 8,
    symbol: 'AVAX',
    name: 'Avalanche',
    image: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
    price: 87.65,
    change24hPct: 3.45,
    high24h: 89.23,
    low24h: 83.67,
    marketCap: 33450000000,
    volume24h: 1890000000,
    sparkline7d: generateSparkline(87.65, 0.045),
    circulatingSupply: 381560000,
    totalSupply: 442560000,
    maxSupply: 720000000,
  },
  {
    id: 'chainlink',
    rank: 9,
    symbol: 'LINK',
    name: 'Chainlink',
    image: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
    price: 23.45,
    change24hPct: -1.89,
    high24h: 24.12,
    low24h: 22.98,
    marketCap: 13890000000,
    volume24h: 567000000,
    sparkline7d: generateSparkline(23.45, 0.04),
    circulatingSupply: 592000000,
    totalSupply: 1000000000,
    maxSupply: 1000000000,
  },
  {
    id: 'polygon',
    rank: 10,
    symbol: 'MATIC',
    name: 'Polygon',
    image: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    price: 1.89,
    change24hPct: 5.67,
    high24h: 1.95,
    low24h: 1.76,
    marketCap: 17850000000,
    volume24h: 890000000,
    sparkline7d: generateSparkline(1.89, 0.06),
    circulatingSupply: 9440000000,
    totalSupply: 10000000000,
    maxSupply: 10000000000,
  },
];

// Simulate live price updates
export const simulatePriceUpdate = (coin: CoinData): CoinData => {
  const volatility = 0.001; // 0.1% max change per update
  const change = (Math.random() - 0.5) * volatility * 2;
  const newPrice = Math.max(0.000001, coin.price * (1 + change));
  
  return {
    ...coin,
    price: newPrice,
    change24hPct: coin.change24hPct + change * 100,
  };
};

// Get trending coins (mock implementation)
export const getTrendingCoins = (): CoinData[] => {
  return mockCoins
    .sort((a, b) => Math.abs(b.change24hPct) - Math.abs(a.change24hPct))
    .slice(0, 6);
};

// Get top gainers
export const getTopGainers = (): CoinData[] => {
  return mockCoins
    .filter(coin => coin.change24hPct > 0)
    .sort((a, b) => b.change24hPct - a.change24hPct)
    .slice(0, 6);
};

// Get top losers  
export const getTopLosers = (): CoinData[] => {
  return mockCoins
    .filter(coin => coin.change24hPct < 0)
    .sort((a, b) => a.change24hPct - b.change24hPct)
    .slice(0, 6);
};