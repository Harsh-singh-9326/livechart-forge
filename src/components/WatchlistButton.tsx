import { Star } from 'lucide-react';
import { useWatchlist } from '@/store/watchlist';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface WatchlistButtonProps {
  coinId: string;
  coinName: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const WatchlistButton = ({ 
  coinId, 
  coinName, 
  size = 'md',
  className 
}: WatchlistButtonProps) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isWatched = isInWatchlist(coinId);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWatched) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size={size === 'sm' ? 'sm' : 'default'}
          onClick={handleToggle}
          className={cn(
            'transition-smooth hover:scale-110',
            size === 'sm' ? 'h-8 w-8 p-0' : 'h-10 w-10 p-0',
            className
          )}
        >
          <Star 
            className={cn(
              size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
              isWatched && 'fill-warning text-warning'
            )} 
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isWatched ? `Remove ${coinName} from watchlist` : `Add ${coinName} to watchlist`}
      </TooltipContent>
    </Tooltip>
  );
};