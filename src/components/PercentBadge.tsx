import { formatPercent } from '@/lib/format';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PercentBadgeProps {
  percent: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const PercentBadge = ({ 
  percent, 
  className, 
  size = 'md',
  showIcon = true 
}: PercentBadgeProps) => {
  const isPositive = percent >= 0;
  
  return (
    <div className={cn(
      'inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium transition-smooth',
      {
        'text-xs px-1.5 py-0.5': size === 'sm',
        'text-sm': size === 'md', 
        'text-base px-3 py-1.5': size === 'lg',
      },
      isPositive 
        ? 'bg-success/10 text-success border border-success/20' 
        : 'bg-danger/10 text-danger border border-danger/20',
      className
    )}>
      {showIcon && (
        isPositive ? (
          <TrendingUp className={cn(
            'shrink-0',
            size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
          )} />
        ) : (
          <TrendingDown className={cn(
            'shrink-0',
            size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
          )} />
        )
      )}
      {formatPercent(percent)}
    </div>
  );
};