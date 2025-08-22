import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

interface LiveIndicatorProps {
  isLive: boolean;
  className?: string;
  showText?: boolean;
}

export const LiveIndicator = ({ isLive, className, showText = true }: LiveIndicatorProps) => {
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="relative">
        <Circle 
          className={cn(
            'h-3 w-3 transition-smooth',
            isLive 
              ? 'fill-trading-live text-trading-live live-indicator' 
              : 'fill-muted-foreground text-muted-foreground'
          )} 
        />
        {isLive && (
          <Circle className="absolute inset-0 h-3 w-3 fill-trading-live text-trading-live animate-ping opacity-30" />
        )}
      </div>
      {showText && (
        <span className={cn(
          'text-xs font-medium transition-smooth',
          isLive ? 'text-trading-live' : 'text-muted-foreground'
        )}>
          {isLive ? 'LIVE' : 'OFFLINE'}
        </span>
      )}
    </div>
  );
};