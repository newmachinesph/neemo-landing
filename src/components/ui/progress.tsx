'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'coral' | 'gradient';
  showLabel?: boolean;
  glow?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, size = 'md', variant = 'default', showLabel = false, glow = false, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    };

    const getVariant = () => {
      if (variant !== 'default') return variant;
      if (percentage >= 100) return 'danger';
      if (percentage >= 80) return 'warning';
      return 'success';
    };

    const variants = {
      default: 'bg-blue-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-500',
      danger: 'bg-red-600',
      coral: 'bg-[#f58560]',
      gradient: 'bg-gradient-to-r from-[#b91c4a] to-[#f58560]',
    };

    const glowStyles = glow ? 'shadow-[0_0_15px_rgba(245,133,96,0.5)]' : '';

    return (
      <div className="w-full">
        {showLabel && (
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-700 dark:text-white/80">Progress</span>
            <span className="text-sm font-medium text-gray-500 dark:text-white/60">{percentage.toFixed(0)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            'w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden',
            sizes[size],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variants[getVariant()],
              glowStyles
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
