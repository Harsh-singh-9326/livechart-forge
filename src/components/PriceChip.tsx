import { Currency } from '@/store/settings';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface PriceChipProps {
  price: number;
  currency: Currency;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isLive?: boolean;
}

export const PriceChip = ({ 
  price, 
  currency, 
  className, 
  size = 'md',
  isLive = false 
}: PriceChipProps) => {
  return (
    <div className={cn(
      'font-mono font-semibold transition-smooth',
      {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
      },
      isLive && 'live-indicator',
      className
    )}>
      {formatCurrency(price, currency)}
    </div>
  );
};