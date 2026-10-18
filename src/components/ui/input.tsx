'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, iconPosition = 'left', ...props }, ref) => {
    const hasIcon = !!icon;

    return (
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border bg-white dark:bg-white/[0.08] px-4 py-2 text-sm transition-all duration-200',
            'border-gray-200 dark:border-white/15',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400 dark:placeholder:text-white/40',
            'focus:outline-none focus:border-[#f58560] focus:ring-2 focus:ring-[#f58560]/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            hasIcon && iconPosition === 'left' && 'pl-11',
            hasIcon && iconPosition === 'right' && 'pr-11',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40">
            {icon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-xl border bg-white dark:bg-white/[0.08] px-4 py-3 text-sm transition-all duration-200',
          'border-gray-200 dark:border-white/15',
          'text-gray-900 dark:text-white',
          'placeholder:text-gray-400 dark:placeholder:text-white/40',
          'focus:outline-none focus:border-[#f58560] focus:ring-2 focus:ring-[#f58560]/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-none',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Input, Textarea };
