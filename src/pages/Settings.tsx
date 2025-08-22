import { useSettings, Currency } from '@/store/settings';
import { useWatchlist } from '@/store/watchlist';
import { usePortfolio } from '@/store/portfolio';
import { useAlerts } from '@/store/alerts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon,
  DollarSign,
  Palette,
  Clock,
  Trash2,
  Star,
  Bell,
  Briefcase,
  Download,
  Upload
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings = () => {
  const { 
    currency, 
    setCurrency, 
    theme, 
    setTheme, 
    defaultInterval, 
    setDefaultInterval 
  } = useSettings();
  
  const { clearWatchlist, ids: watchlistIds } = useWatchlist();
  const { clearPortfolio, trades, positions } = usePortfolio();
  const { alerts, clearTriggeredAlerts } = useAlerts();
  
  const handleExportData = () => {
    const data = {
      watchlist: watchlistIds,
      portfolio: { trades, positions },
      alerts: alerts,
      settings: { currency, theme, defaultInterval },
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coinraft-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
            <SettingsIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Customize your CoinRaft experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Currency & Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">🇺🇸 USD ($)</SelectItem>
                    <SelectItem value="inr">🇮🇳 INR (₹)</SelectItem>
                    <SelectItem value="usdt">₮ USDT ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={(value: 'light' | 'dark') => setTheme(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">🌙 Dark</SelectItem>
                    <SelectItem value="light">☀️ Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interval">Default Chart Interval</Label>
                <Select 
                  value={defaultInterval} 
                  onValueChange={(value: '1m' | '5m' | '15m' | '1h' | '4h' | '1d') => setDefaultInterval(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Minute</SelectItem>
                    <SelectItem value="5m">5 Minutes</SelectItem>
                    <SelectItem value="15m">15 Minutes</SelectItem>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="4h">4 Hours</SelectItem>
                    <SelectItem value="1d">1 Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Export Data</div>
                  <div className="text-sm text-muted-foreground">
                    Download your watchlist, portfolio, and settings
                  </div>
                </div>
                <Button variant="outline" onClick={handleExportData} className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Import Data</div>
                  <div className="text-sm text-muted-foreground">
                    Restore from a previous export
                  </div>
                </div>
                <Button variant="outline" disabled className="gap-2">
                  <Upload className="h-4 w-4" />
                  Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Data Overview & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-warning" />
                  <div>
                    <div className="font-medium">Watchlist</div>
                    <div className="text-sm text-muted-foreground">
                      Tracked cryptocurrencies
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">
                  {watchlistIds.length} coins
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Portfolio</div>
                    <div className="text-sm text-muted-foreground">
                      Investment positions
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">
                  {positions.length} positions
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-success" />
                  <div>
                    <div className="font-medium">Price Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Active notifications
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">
                  {alerts.filter(a => !a.triggered).length} active
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-danger">
                <Trash2 className="h-5 w-5" />
                Reset Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Clear Watchlist</div>
                  <div className="text-sm text-muted-foreground">
                    Remove all coins from watchlist
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={clearWatchlist}
                  disabled={watchlistIds.length === 0}
                  className="gap-2"
                >
                  <Star className="h-4 w-4" />
                  Clear ({watchlistIds.length})
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Clear Portfolio</div>
                  <div className="text-sm text-muted-foreground">
                    Remove all trades and positions
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={clearPortfolio}
                  disabled={positions.length === 0}
                  className="gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Clear ({positions.length})
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Clear Triggered Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Remove completed notifications
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={clearTriggeredAlerts}
                  disabled={alerts.filter(a => a.triggered).length === 0}
                  className="gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Clear ({alerts.filter(a => a.triggered).length})
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="h-4 w-4 text-warning" />
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Disclaimer</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    CoinRaft provides cryptocurrency market data for informational purposes only. 
                    Prices and market information should not be considered as investment advice. 
                    Always do your own research before making investment decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;