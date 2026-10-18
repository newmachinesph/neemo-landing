'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'coral' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, glow, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-press';

    const variants = {
      primary: 'bg-gradient-to-r from-[#9b1b3c] to-[#b91c4a] text-white hover:from-[#831530] hover:to-[#9b1b3c] focus:ring-[#b91c4a] shadow-md hover:shadow-lg',
      secondary: 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 focus:ring-gray-500',
      outline: 'border-2 border-gray-200 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 focus:ring-gray-500',
      ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md',
      coral: 'bg-[#f58560] text-[#2f0a18] hover:bg-[#f79b7a] focus:ring-[#f58560] shadow-md hover:shadow-[0_4px_20px_rgba(245,133,96,0.4)]',
      gradient: 'bg-gradient-to-r from-[#b91c4a] to-[#f58560] text-[#2f0a18] hover:from-[#9b1b3c] hover:to-[#f79b7a] focus:ring-[#f58560] shadow-md',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2',
      xl: 'px-8 py-4 text-lg gap-2.5',
    };

    const glowStyles = glow ? 'btn-glow-coral animate-glow-pulse' : '';

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], glowStyles, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
