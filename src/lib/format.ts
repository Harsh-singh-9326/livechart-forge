import { Currency } from '@/store/settings';
import { mockFxRates } from './mockData';

// Format number to currency
export const formatCurrency = (
  value: number,
  currency: Currency,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  } = {}
): string => {
  const rate = mockFxRates[currency];
  const convertedValue = value * rate;
  
  const symbols = {
    usd: '$',
    inr: '₹',
    usdt: '$',
  };
  
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: options.minimumFractionDigits ?? (convertedValue < 1 ? 4 : 2),
    maximumFractionDigits: options.maximumFractionDigits ?? (convertedValue < 1 ? 6 : 2),
    notation: options.notation,
  }).format(convertedValue);
  
  return `${symbols[currency]}${formatted}`;
};

// Format percentage
export const formatPercent = (value: number): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${formatted}%`;
};

// Format large numbers (market cap, volume)
export const formatLargeNumber = (value: number, currency: Currency): string => {
  const rate = mockFxRates[currency];
  const convertedValue = value * rate;
  
  const symbols = {
    usd: '$',
    inr: '₹',
    usdt: '$',
  };
  
  if (convertedValue >= 1e12) {
    return `${symbols[currency]}${(convertedValue / 1e12).toFixed(2)}T`;
  } else if (convertedValue >= 1e9) {
    return `${symbols[currency]}${(convertedValue / 1e9).toFixed(2)}B`;
  } else if (convertedValue >= 1e6) {
    return `${symbols[currency]}${(convertedValue / 1e6).toFixed(2)}M`;
  } else if (convertedValue >= 1e3) {
    return `${symbols[currency]}${(convertedValue / 1e3).toFixed(2)}K`;
  } else {
    return formatCurrency(value, currency);
  }
};

// Format time ago
export const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
};

// Format trade size
export const formatTradeSize = (size: number): string => {
  if (size >= 1000) {
    return `${(size / 1000).toFixed(2)}K`;
  } else if (size >= 1) {
    return size.toFixed(3);
  } else {
    return size.toFixed(6);
  }
};

// Convert price between currencies
export const convertPrice = (
  value: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  if (fromCurrency === toCurrency) return value;
  
  // Convert to USD first, then to target currency
  const usdValue = value / mockFxRates[fromCurrency];
  return usdValue * mockFxRates[toCurrency];
};

// Format supply numbers
export const formatSupply = (supply: number | null): string => {
  if (supply === null || supply === undefined) return 'N/A';
  
  if (supply >= 1e9) {
    return `${(supply / 1e9).toFixed(2)}B`;
  } else if (supply >= 1e6) {
    return `${(supply / 1e6).toFixed(2)}M`;
  } else if (supply >= 1e3) {
    return `${(supply / 1e3).toFixed(2)}K`;
  } else {
    return new Intl.NumberFormat('en-US').format(supply);
  }
};