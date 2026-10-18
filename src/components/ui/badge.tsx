'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'coral' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80',
      success: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400',
      warning: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400',
      danger: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400',
      info: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400',
      coral: 'bg-[#f58560]/20 text-[#2f0a18] dark:text-[#f58560]',
      outline: 'border border-gray-200 dark:border-white/20 text-gray-600 dark:text-white/70',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
