import { useState, useEffect, useMemo } from 'react';
import { SearchBox } from '@/components/SearchBox';
import { MarketTable } from '@/components/MarketTable';
import { TrendingSection } from '@/components/TrendingSection';
import { mockCoins, getTrendingCoins, getTopGainers, getTopLosers, simulatePriceUpdate } from '@/lib/mockData';
import { wsClient } from '@/lib/wsClient';
import { useSettings } from '@/store/settings';
import { CoinData } from '@/lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Markets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coins, setCoins] = useState<CoinData[]>(mockCoins);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize WebSocket connection for live prices
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        await wsClient.connect();
        
        // Subscribe to ticker updates
        wsClient.subscribeToTickers((data) => {
          setCoins(prevCoins => 
            prevCoins.map(coin => {
              // Map Binance symbols to coin IDs
              const symbolMap: Record<string, string> = {
                'BTCUSDT': 'bitcoin',
                'ETHUSDT': 'ethereum', 
                'BNBUSDT': 'binancecoin',
                'SOLUSDT': 'solana',
                'XRPUSDT': 'ripple',
                'DOGEUSDT': 'dogecoin',
                'ADAUSDT': 'cardano',
                'AVAXUSDT': 'avalanche-2',
                'LINKUSDT': 'chainlink',
                'MATICUSDT': 'polygon',
              };
              
              const coinId = symbolMap[data.symbol];
              if (coin.id === coinId) {
                return {
                  ...coin,
                  price: data.price,
                  change24hPct: data.change24h,
                };
              }
              return coin;
            })
          );
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
        setIsLoading(false);
      }
    };
    
    initializeWebSocket();
    
    return () => {
      wsClient.disconnect();
    };
  }, []);
  
  // Filter coins based on search query
  const filteredCoins = useMemo(() => {
    if (!searchQuery.trim()) return coins;
    
    const query = searchQuery.toLowerCase();
    return coins.filter(coin => 
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query)
    );
  }, [coins, searchQuery]);
  
  // Get trending data
  const trendingCoins = useMemo(() => getTrendingCoins(), []);
  const topGainers = useMemo(() => getTopGainers(), []);
  const topLosers = useMemo(() => getTopLosers(), []);
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Cryptocurrency Markets
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Track live prices, analyze trends, and manage your portfolio with real-time market data
        </p>
      </div>
      
      {/* Search */}
      <div className="max-w-md mx-auto">
        <SearchBox 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search coins by name or symbol..."
        />
      </div>
      
      {/* Trending Sections */}
      {!searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TrendingSection 
            title="🔥 Trending" 
            coins={trendingCoins}
          />
          <TrendingSection 
            title="📈 Top Gainers" 
            coins={topGainers}
          />
          <TrendingSection 
            title="📉 Top Losers" 
            coins={topLosers}
          />
        </div>
      )}
      
      {/* Market Data */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Search Results (${filteredCoins.length})` : 'All Cryptocurrencies'}
          </h2>
          {!searchQuery && (
            <div className="text-sm text-muted-foreground">
              Showing {filteredCoins.length} coins
            </div>
          )}
        </div>
        
        <MarketTable coins={filteredCoins} />
      </div>
      
      {/* Empty State */}
      {searchQuery && filteredCoins.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No coins found</h3>
          <p className="text-muted-foreground">
            Try searching for a different cryptocurrency name or symbol.
          </p>
        </div>
      )}
    </div>
  );
};

export default Markets;