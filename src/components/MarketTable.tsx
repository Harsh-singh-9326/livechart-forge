import { useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { CoinData } from '@/lib/mockData';
import { MarketRow } from '@/components/MarketRow';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MarketTableProps {
  coins: CoinData[];
  className?: string;
}

export const MarketTable = ({ coins, className }: MarketTableProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: coins.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // Approximate row height
    overscan: 10,
  });
  
  const items = virtualizer.getVirtualItems();
  
  return (
    <Card className={cn('overflow-hidden', className)}>
      {/* Table Header */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto_auto] lg:grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto_auto_auto] gap-4 px-4 py-3 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        <div className="text-center">#</div>
        <div>Name</div>
        <div className="text-right">Price</div>
        <div className="text-right">24h %</div>
        <div className="hidden sm:block text-right">24h High</div>
        <div className="hidden sm:block text-right">24h Low</div>
        <div className="hidden md:block text-right">Market Cap</div>
        <div className="hidden lg:block text-right">Volume</div>
        <div className="hidden xl:block text-center">Last 7 Days</div>
        <div className="text-center">Watch</div>
      </div>
      
      {/* Virtual Table Body */}
      <div
        ref={parentRef}
        className="h-[600px] overflow-auto"
        style={{
          contain: 'strict',
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {items.map((virtualItem) => {
            const coin = coins[virtualItem.index];
            if (!coin) return null;
            
            return (
              <div
                key={coin.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <MarketRow coin={coin} />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};