import { Currency, useSettings } from '@/store/settings';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const currencyLabels: Record<Currency, string> = {
  usd: 'USD ($)',
  inr: 'INR (₹)',
  usdt: 'USDT ($)',
};

const currencyIcons: Record<Currency, string> = {
  usd: '🇺🇸',
  inr: '🇮🇳', 
  usdt: '₮',
};

export const CurrencyToggle = () => {
  const { currency, setCurrency } = useSettings();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span className="text-sm">{currencyIcons[currency]}</span>
          <span className="font-medium">{currency.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {(Object.keys(currencyLabels) as Currency[]).map((curr) => (
          <DropdownMenuItem
            key={curr}
            onClick={() => setCurrency(curr)}
            className="gap-2 cursor-pointer"
          >
            <span>{currencyIcons[curr]}</span>
            <span>{currencyLabels[curr]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};