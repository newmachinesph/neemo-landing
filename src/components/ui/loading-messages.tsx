'use client';

import { useState, useEffect, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface LoadingMessage {
  text: string;
}

// Fun loading messages
const loadingMessages: LoadingMessage[] = [
  { text: 'Just a moment...' },
  { text: 'Hold on, still loading...' },
  { text: 'Taking it easy...' },
  { text: 'Please wait...' },
  { text: 'Almost there...' },
  { text: 'Finding your data...' },
  { text: 'Calculating your money...' },
  { text: 'Preparing your pesos...' },
  { text: 'Checking your savings...' },
  { text: 'Counting your centavos...' },
  { text: 'Crunching the numbers...' },
  { text: 'Brewing your budget...' },
  { text: 'Fetching your financial dreams...' },
  { text: 'Loading your loot...' },
  { text: 'Summoning your savings...' },
  { text: 'Balancing the books...' },
  { text: 'Tracking your treasure...' },
  { text: 'Organizing your cash...' },
  { text: 'On its way...' },
  { text: 'Loading your salary...' },
];

const getRandomLoadingMessage = (): LoadingMessage => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};

interface LoadingMessagesProps extends HTMLAttributes<HTMLDivElement> {
  interval?: number;
  showSpinner?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'card';
}

const LoadingMessages = forwardRef<HTMLDivElement, LoadingMessagesProps>(
  (
    {
      className,
      interval = 3000,
      showSpinner = true,
      size = 'md',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [message, setMessage] = useState<LoadingMessage>(getRandomLoadingMessage());
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      const timer = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setMessage(getRandomLoadingMessage());
          setIsAnimating(false);
        }, 300);
      }, interval);

      return () => clearInterval(timer);
    }, [interval]);

    const sizeStyles = {
      sm: {
        container: 'gap-2',
        spinner: 'w-4 h-4',
        text: 'text-sm',
      },
      md: {
        container: 'gap-3',
        spinner: 'w-6 h-6',
        text: 'text-base',
      },
      lg: {
        container: 'gap-4',
        spinner: 'w-8 h-8',
        text: 'text-lg',
      },
    };

    const styles = sizeStyles[size];

    const spinner = showSpinner && (
      <svg
        className={cn('animate-spin text-blue-500', styles.spinner)}
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
    );

    const messageContent = (
      <div
        className={cn(
          'transition-all duration-300',
          isAnimating ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
        )}
      >
        <p className={cn('font-medium text-gray-800', styles.text)}>
          {message.text}
        </p>
      </div>
    );

    if (variant === 'minimal') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center', styles.container, className)}
          {...props}
        >
          {spinner}
          <span
            className={cn(
              'text-gray-600 transition-opacity duration-300',
              styles.text,
              isAnimating ? 'opacity-0' : 'opacity-100'
            )}
          >
            {message.text}
          </span>
        </div>
      );
    }

    if (variant === 'card') {
      return (
        <div
          ref={ref}
          className={cn(
            'bg-white rounded-xl border border-gray-200 shadow-sm p-6',
            'flex flex-col items-center justify-center text-center',
            styles.container,
            className
          )}
          {...props}
        >
          {spinner}
          {messageContent}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          styles.container,
          className
        )}
        {...props}
      >
        {spinner}
        {messageContent}
      </div>
    );
  }
);
LoadingMessages.displayName = 'LoadingMessages';

// Full page loading overlay
interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
}

const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ className, isLoading, ...props }, ref) => {
    if (!isLoading) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-white/80 backdrop-blur-sm',
          className
        )}
        {...props}
      >
        <LoadingMessages size="lg" variant="default" />
      </div>
    );
  }
);
LoadingOverlay.displayName = 'LoadingOverlay';

// Inline loading for buttons/small areas
interface InlineLoadingProps extends HTMLAttributes<HTMLSpanElement> {
  text?: string;
}

const InlineLoading = forwardRef<HTMLSpanElement, InlineLoadingProps>(
  ({ className, text, ...props }, ref) => {
    const [message] = useState(getRandomLoadingMessage());

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-2 text-sm text-gray-600', className)}
        {...props}
      >
        <svg
          className="animate-spin w-4 h-4"
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
        {text || message.text}
      </span>
    );
  }
);
InlineLoading.displayName = 'InlineLoading';

export {
  LoadingMessages,
  LoadingOverlay,
  InlineLoading,
  loadingMessages,
  getRandomLoadingMessage,
};
export type { LoadingMessage, LoadingMessagesProps, LoadingOverlayProps, InlineLoadingProps };
