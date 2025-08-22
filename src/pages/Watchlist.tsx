import { useMemo } from 'react';
import { useWatchlist } from '@/store/watchlist';
import { mockCoins } from '@/lib/mockData';
import { MarketTable } from '@/components/MarketTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const { ids: watchlistIds, clearWatchlist } = useWatchlist();
  
  const watchlistCoins = useMemo(() => {
    return mockCoins.filter(coin => watchlistIds.includes(coin.id));
  }, [watchlistIds]);
  
  const isEmpty = watchlistCoins.length === 0;
  
  if (isEmpty) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Your Watchlist</h1>
          <p className="text-lg text-muted-foreground">
            Keep track of your favorite cryptocurrencies
          </p>
        </div>
        
        <Card className="max-w-lg mx-auto">
          <CardContent className="text-center py-16">
            <Star className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add coins to your watchlist to track their performance and get quick access to their details.
            </p>
            <Link to="/">
              <Button>
                Browse Markets
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Your Watchlist</h1>
          <p className="text-lg text-muted-foreground mt-2">
            {watchlistCoins.length} coin{watchlistCoins.length !== 1 ? 's' : ''} in your watchlist
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={clearWatchlist}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>
      
      <MarketTable coins={watchlistCoins} />
    </div>
  );
};

export default Watchlist;