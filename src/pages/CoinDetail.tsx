import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { mockCoins, CoinData, generateOrderBook, generateTrades, generateCandleData } from '@/lib/mockData';
import { useSettings } from '@/store/settings';
import { PriceChip } from '@/components/PriceChip';
import { PercentBadge } from '@/components/PercentBadge';
import { WatchlistButton } from '@/components/WatchlistButton';
import { formatLargeNumber, formatSupply } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ExternalLink, 
  Globe, 
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CoinDetail = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const { currency } = useSettings();
  const [selectedInterval, setSelectedInterval] = useState('1h');
  
  const coin = useMemo(() => {
    return mockCoins.find(c => c.id === coinId);
  }, [coinId]);
  
  const orderBook = useMemo(() => {
    return coin ? generateOrderBook(coin.price) : null;
  }, [coin]);
  
  const trades = useMemo(() => {
    return coin ? generateTrades(coin.price) : [];
  }, [coin]);
  
  const candleData = useMemo(() => {
    return coin ? generateCandleData(coin.price, selectedInterval) : [];
  }, [coin, selectedInterval]);
  
  if (!coin) {
    return <Navigate to="/404" replace />;
  }
  
  const intervals = ['1m', '5m', '15m', '1h', '4h', '1d'];
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Coin Info */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <img 
                src={coin.image} 
                alt={coin.name}
                className="h-16 w-16 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/64x64/6366f1/ffffff?text=' + coin.symbol.charAt(0);
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{coin.name}</h1>
                  <Badge variant="secondary" className="text-sm uppercase">
                    {coin.symbol}
                  </Badge>
                  <Badge variant="outline">
                    Rank #{coin.rank}
                  </Badge>
                  <WatchlistButton coinId={coin.id} coinName={coin.name} />
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <PriceChip price={coin.price} currency={currency} size="lg" isLive />
                  <PercentBadge percent={coin.change24hPct} size="lg" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">24h High</div>
                    <div className="font-semibold">
                      <PriceChip price={coin.high24h} currency={currency} size="sm" />
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">24h Low</div>
                    <div className="font-semibold">
                      <PriceChip price={coin.low24h} currency={currency} size="sm" />
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Market Cap</div>
                    <div className="font-semibold">
                      {formatLargeNumber(coin.marketCap, currency)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Volume (24h)</div>
                    <div className="font-semibold">
                      {formatLargeNumber(coin.volume24h, currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Stats */}
        <Card className="lg:w-80">
          <CardHeader>
            <CardTitle className="text-lg">Market Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Circulating Supply</span>
              <span className="font-semibold">{formatSupply(coin.circulatingSupply)} {coin.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Supply</span>
              <span className="font-semibold">{formatSupply(coin.totalSupply)} {coin.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Supply</span>
              <span className="font-semibold">{formatSupply(coin.maxSupply)} {coin.symbol}</span>
            </div>
            
            <Separator />
            
            {coin.website && (
              <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                <a href={coin.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Official Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
            
            {coin.explorer && (
              <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                <a href={coin.explorer} target="_blank" rel="noopener noreferrer">
                  <Search className="h-4 w-4" />
                  Blockchain Explorer
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Chart Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Price Chart
            </CardTitle>
            <div className="flex gap-1">
              {intervals.map((interval) => (
                <Button
                  key={interval}
                  variant={selectedInterval === interval ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedInterval(interval)}
                >
                  {interval}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                Interactive chart would be implemented here with lightweight-charts library
              </p>
              <p className="text-xs text-muted-foreground">
                {candleData.length} candles for {selectedInterval} timeframe
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Book & Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Book */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            {orderBook && (
              <div className="space-y-4">
                {/* Asks (Sell Orders) */}
                <div>
                  <div className="text-xs font-semibold text-danger mb-2">SELL ORDERS</div>
                  <div className="space-y-1">
                    {orderBook.asks.slice(0, 10).reverse().map((order, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1">
                        <div className="text-danger font-mono">
                          <PriceChip price={order.price} currency={currency} size="sm" />
                        </div>
                        <div className="text-right font-mono">{order.size.toFixed(4)}</div>
                        <div className="text-right text-muted-foreground font-mono">
                          {order.cumulative.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Current Price */}
                <div className="flex items-center justify-center py-2 border-y border-border">
                  <PriceChip price={coin.price} currency={currency} size="md" isLive />
                </div>
                
                {/* Bids (Buy Orders) */}
                <div>
                  <div className="text-xs font-semibold text-success mb-2">BUY ORDERS</div>
                  <div className="space-y-1">
                    {orderBook.bids.slice(0, 10).map((order, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1">
                        <div className="text-success font-mono">
                          <PriceChip price={order.price} currency={currency} size="sm" />
                        </div>
                        <div className="text-right font-mono">{order.size.toFixed(4)}</div>
                        <div className="text-right text-muted-foreground font-mono">
                          {order.cumulative.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Trades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {trades.slice(0, 20).map((trade) => (
                <div key={trade.id} className="grid grid-cols-4 gap-2 text-sm py-1">
                  <div className={cn(
                    'font-mono',
                    trade.side === 'buy' ? 'text-success' : 'text-danger'
                  )}>
                    <PriceChip price={trade.price} currency={currency} size="sm" />
                  </div>
                  <div className="text-right font-mono">{trade.size.toFixed(4)}</div>
                  <div className="text-right text-xs text-muted-foreground">
                    {new Date(trade.time).toLocaleTimeString()}
                  </div>
                  <div className="text-right">
                    {trade.side === 'buy' ? (
                      <TrendingUp className="h-3 w-3 text-success ml-auto" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-danger ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* About */}
      {coin.description && (
        <Card>
          <CardHeader>
            <CardTitle>About {coin.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {coin.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoinDetail;