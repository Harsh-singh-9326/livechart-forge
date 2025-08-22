import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface MiniSparklineProps {
  data: number[];
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  isPositive?: boolean;
}

export const MiniSparkline = ({ 
  data, 
  className, 
  width = 120, 
  height = 40,
  strokeWidth = 1.5,
  isPositive = true
}: MiniSparklineProps) => {
  const pathData = useMemo(() => {
    if (!data || data.length === 0) return '';
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    if (range === 0) {
      // If all values are the same, draw a straight line in the middle
      const y = height / 2;
      return `M 0 ${y} L ${width} ${y}`;
    }
    
    const stepX = width / (data.length - 1);
    
    return data
      .map((value, index) => {
        const x = index * stepX;
        const y = height - ((value - min) / range) * height;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [data, width, height]);
  
  const strokeColor = isPositive ? 'hsl(var(--success))' : 'hsl(var(--danger))';
  
  return (
    <div className={cn('inline-block', className)}>
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`gradient-${isPositive ? 'up' : 'down'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Fill area under the curve */}
        <path
          d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
          fill={`url(#gradient-${isPositive ? 'up' : 'down'})`}
        />
        
        {/* Sparkline path */}
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};