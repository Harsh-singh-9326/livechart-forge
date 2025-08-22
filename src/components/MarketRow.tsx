import { memo } from 'react';
import { Link } from 'react-router-dom';
import { CoinData } from '@/lib/mockData';
import { Currency, useSettings } from '@/store/settings';
import { PriceChip } from '@/components/PriceChip';
import { PercentBadge } from '@/components/PercentBadge';
import { MiniSparkline } from '@/components/MiniSparkline';
import { WatchlistButton } from '@/components/WatchlistButton';
import { formatLargeNumber, formatSupply } from '@/lib/format';
import { cn } from '@/lib/utils';

interface MarketRowProps {
  coin: CoinData;
  className?: string;
}

export const MarketRow = memo(({ coin, className }: MarketRowProps) => {
  const { currency } = useSettings();
  
  return (
    <Link 
      to={`/coin/${coin.id}`}
      className={cn(
        'grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto_auto] lg:grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto_auto_auto] gap-4 px-4 py-3 transition-smooth hover:bg-muted/50 border-b border-border/50 last:border-b-0',
        className
      )}
    >
      {/* Rank */}
      <div className="flex items-center justify-center min-w-[3rem]">
        <span className="text-sm text-muted-foreground font-medium">
          {coin.rank}
        </span>
      </div>
      
      {/* Coin Info */}
      <div className="flex items-center gap-3 min-w-0">
        <img 
          src={coin.image} 
          alt={coin.name}
          className="h-8 w-8 rounded-full flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/32x32/6366f1/ffffff?text=' + coin.symbol.charAt(0);
          }}
        />
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{coin.name}</div>
          <div className="text-xs text-muted-foreground uppercase">{coin.symbol}</div>
        </div>
      </div>
      
      {/* Price */}
      <div className="flex items-center justify-end">
        <PriceChip price={coin.price} currency={currency} size="sm" />
      </div>
      
      {/* 24h Change */}
      <div className="flex items-center justify-end">
        <PercentBadge percent={coin.change24hPct} size="sm" />
      </div>
      
      {/* 24h High */}
      <div className="hidden sm:flex items-center justify-end">
        <PriceChip price={coin.high24h} currency={currency} size="sm" />
      </div>
      
      {/* 24h Low */}
      <div className="hidden sm:flex items-center justify-end">
        <PriceChip price={coin.low24h} currency={currency} size="sm" />
      </div>
      
      {/* Market Cap */}
      <div className="hidden md:flex items-center justify-end">
        <span className="text-sm font-medium">
          {formatLargeNumber(coin.marketCap, currency)}
        </span>
      </div>
      
      {/* Volume */}
      <div className="hidden lg:flex items-center justify-end">
        <span className="text-sm font-medium">
          {formatLargeNumber(coin.volume24h, currency)}
        </span>
      </div>
      
      {/* Sparkline */}
      <div className="hidden xl:flex items-center justify-center">
        <MiniSparkline 
          data={coin.sparkline7d} 
          width={100}
          height={32}
          isPositive={coin.change24hPct >= 0}
        />
      </div>
      
      {/* Watchlist */}
      <div className="flex items-center justify-center">
        <WatchlistButton coinId={coin.id} coinName={coin.name} size="sm" />
      </div>
    </Link>
  );
});

MarketRow.displayName = 'MarketRow';