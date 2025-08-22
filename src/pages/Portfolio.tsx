import { useState } from 'react';
import { usePortfolio } from '@/store/portfolio';
import { useSettings } from '@/store/settings';
import { formatCurrency, formatPercent, formatLargeNumber } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  History,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Portfolio = () => {
  const { positions, trades, getTotalValue, getTotalPnL, clearPortfolio } = usePortfolio();
  const { currency } = useSettings();
  const [activeTab, setActiveTab] = useState<'positions' | 'trades'>('positions');
  
  const totalValue = getTotalValue();
  const totalPnL = getTotalPnL();
  const totalPnLPercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;
  
  const isEmpty = positions.length === 0 && trades.length === 0;
  
  if (isEmpty) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Your Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            Track your crypto investments and performance
          </p>
        </div>
        
        <Card className="max-w-lg mx-auto">
          <CardContent className="text-center py-16">
            <PieChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No investments tracked</h3>
            <p className="text-muted-foreground mb-6">
              Start building your portfolio by adding your first crypto investment.
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Investment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Your Portfolio</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Track and manage your cryptocurrency investments
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Trade
          </Button>
          <Button variant="outline" onClick={clearPortfolio} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>
      
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalValue, currency)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center",
                totalPnL >= 0 ? "bg-success/10" : "bg-danger/10"
              )}>
                {totalPnL >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-success" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-danger" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unrealized P&L</p>
                <p className={cn(
                  "text-2xl font-bold",
                  totalPnL >= 0 ? "text-success" : "text-danger"
                )}>
                  {formatCurrency(totalPnL, currency)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center",
                totalPnLPercent >= 0 ? "bg-success/10" : "bg-danger/10"
              )}>
                <PieChart className={cn(
                  "h-5 w-5",
                  totalPnLPercent >= 0 ? "text-success" : "text-danger"
                )} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Return %</p>
                <p className={cn(
                  "text-2xl font-bold",
                  totalPnLPercent >= 0 ? "text-success" : "text-danger"
                )}>
                  {formatPercent(totalPnLPercent)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'positions' ? 'secondary' : 'ghost'}
          onClick={() => setActiveTab('positions')}
          className="gap-2"
        >
          <PieChart className="h-4 w-4" />
          Positions ({positions.length})
        </Button>
        <Button
          variant={activeTab === 'trades' ? 'secondary' : 'ghost'}
          onClick={() => setActiveTab('trades')}
          className="gap-2"
        >
          <History className="h-4 w-4" />
          Trade History ({trades.length})
        </Button>
      </div>
      
      {/* Positions */}
      {activeTab === 'positions' && (
        <Card>
          <CardHeader>
            <CardTitle>Current Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positions.map((position) => (
                <div key={position.coinId} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-sm">
                        {position.coinSymbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{position.coinName}</div>
                      <div className="text-sm text-muted-foreground">
                        {position.coinSymbol} • {position.totalQuantity.toFixed(6)} coins
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatCurrency(position.totalValue, currency)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg: {formatCurrency(position.averagePrice, currency)}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={cn(
                      "font-semibold",
                      position.unrealizedPnL >= 0 ? "text-success" : "text-danger"
                    )}>
                      {formatCurrency(position.unrealizedPnL, currency)}
                    </div>
                    <div className={cn(
                      "text-sm",
                      position.unrealizedPnLPercent >= 0 ? "text-success" : "text-danger"
                    )}>
                      {formatPercent(position.unrealizedPnLPercent)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Trade History */}
      {activeTab === 'trades' && (
        <Card>
          <CardHeader>
            <CardTitle>Trade History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trades.map((trade) => (
                <div key={trade.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                  <Badge variant={trade.side === 'buy' ? 'default' : 'secondary'}>
                    {trade.side.toUpperCase()}
                  </Badge>
                  
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-xs">
                        {trade.coinSymbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{trade.coinName}</div>
                      <div className="text-sm text-muted-foreground">
                        {trade.quantity.toFixed(6)} {trade.coinSymbol}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatCurrency(trade.price, currency)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total: {formatCurrency(trade.price * trade.quantity, currency)}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {new Date(trade.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(trade.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Portfolio;