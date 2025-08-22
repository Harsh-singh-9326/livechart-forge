import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CurrencyToggle } from '@/components/CurrencyToggle';
import { LiveIndicator } from '@/components/LiveIndicator';
import { 
  BarChart3, 
  Star, 
  Briefcase, 
  Settings,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Markets', href: '/', icon: BarChart3 },
  { name: 'Watchlist', href: '/watchlist', icon: Star },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CoinRaft
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
            
            {/* Right side controls */}
            <div className="flex items-center gap-3">
              <LiveIndicator isLive={true} />
              <CurrencyToggle />
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="border-t border-border pb-3 pt-2 md:hidden">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.href} 
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                        className="w-full justify-start gap-3"
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-primary">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">CoinRaft</span>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Prices are for informational purposes only. Not investment advice.
            </p>
            
            <div className="text-sm text-muted-foreground">
              © 2024 CoinRaft. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};