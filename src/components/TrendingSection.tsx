import { CoinData } from '@/lib/mockData';
import { Currency, useSettings } from '@/store/settings';
import { PriceChip } from '@/components/PriceChip';
import { PercentBadge } from '@/components/PercentBadge';
import { MiniSparkline } from '@/components/MiniSparkline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TrendingSectionProps {
  title: string;
  coins: CoinData[];
  className?: string;
}

export const TrendingSection = ({ title, coins, className }: TrendingSectionProps) => {
  const { currency } = useSettings();
  
  if (coins.length === 0) return null;
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {coins.slice(0, 6).map((coin) => (
          <Link 
            key={coin.id}
            to={`/coin/${coin.id}`}
            className="flex items-center gap-3 p-2 rounded-lg transition-smooth hover:bg-muted/50"
          >
            {/* Coin info */}
            <img 
              src={coin.image} 
              alt={coin.name}
              className="h-6 w-6 rounded-full flex-shrink-0"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/24x24/6366f1/ffffff?text=' + coin.symbol.charAt(0);
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{coin.name}</div>
                  <div className="text-xs text-muted-foreground uppercase">{coin.symbol}</div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <PriceChip price={coin.price} currency={currency} size="sm" />
                  <div className="mt-0.5">
                    <PercentBadge percent={coin.change24hPct} size="sm" showIcon={false} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mini sparkline */}
            <div className="hidden sm:block flex-shrink-0">
              <MiniSparkline 
                data={coin.sparkline7d.slice(-24)} // Last 24 hours
                width={60}
                height={24}
                strokeWidth={1}
                isPositive={coin.change24hPct >= 0}
              />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};