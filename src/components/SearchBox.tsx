import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBox = ({ 
  value, 
  onChange, 
  placeholder = 'Search coins...', 
  className 
}: SearchBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);
  
  return (
    <div className={cn(
      'relative flex items-center',
      className
    )}>
      <div className="relative flex-1">
        <Search className={cn(
          'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-smooth',
          isFocused ? 'text-primary' : 'text-muted-foreground'
        )} />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'pl-10 pr-10 transition-smooth',
            'focus:ring-2 focus:ring-primary/20',
            value && 'pr-10'
          )}
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};