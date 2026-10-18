'use client';

import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  HTMLAttributes,
  forwardRef,
} from 'react';
import { cn } from '@/lib/utils';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  showArrow?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent',
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      position = 'top',
      delay = 200,
      showArrow = true,
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [actualPosition, setActualPosition] = useState(position);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Check if tooltip would overflow viewport and adjust position
    useEffect(() => {
      if (isVisible && tooltipRef.current && containerRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newPosition = position;

        // Check overflow and flip if necessary
        if (position === 'top' && tooltipRect.top < 0) {
          newPosition = 'bottom';
        } else if (position === 'bottom' && tooltipRect.bottom > viewportHeight) {
          newPosition = 'top';
        } else if (position === 'left' && tooltipRect.left < 0) {
          newPosition = 'right';
        } else if (position === 'right' && tooltipRect.right > viewportWidth) {
          newPosition = 'left';
        }

        if (newPosition !== actualPosition) {
          setActualPosition(newPosition);
        }
      }
    }, [isVisible, position, actualPosition]);

    const handleMouseEnter = () => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsVisible(false);
    };

    const handleFocus = () => {
      if (disabled) return;
      setIsVisible(true);
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn('relative inline-flex', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}
        {isVisible && !disabled && (
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg',
              'whitespace-nowrap animate-tooltip-fade-in',
              positionStyles[actualPosition]
            )}
          >
            {content}
            {showArrow && (
              <div
                className={cn(
                  'absolute w-0 h-0 border-4',
                  arrowStyles[actualPosition]
                )}
              />
            )}
          </div>
        )}
        <style jsx>{`
          @keyframes tooltip-fade-in {
            from {
              opacity: 0;
              transform: translateX(-50%) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) scale(1);
            }
          }
          .animate-tooltip-fade-in {
            animation: tooltip-fade-in 0.15s ease-out;
          }
        `}</style>
      </div>
    );
  }
);
Tooltip.displayName = 'Tooltip';

// Simple text tooltip shorthand
interface SimpleTooltipProps {
  text: string;
  children: ReactNode;
  position?: TooltipPosition;
}

const SimpleTooltip = ({ text, children, position = 'top' }: SimpleTooltipProps) => (
  <Tooltip content={text} position={position}>
    {children}
  </Tooltip>
);

// Info tooltip with icon
interface InfoTooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  iconClassName?: string;
}

const InfoTooltip = ({ content, position = 'top', iconClassName }: InfoTooltipProps) => (
  <Tooltip content={content} position={position}>
    <span
      className={cn(
        'inline-flex items-center justify-center w-4 h-4 text-xs text-gray-400 hover:text-gray-600 cursor-help',
        iconClassName
      )}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>
  </Tooltip>
);

export { Tooltip, SimpleTooltip, InfoTooltip };
export type { TooltipProps, TooltipPosition, SimpleTooltipProps, InfoTooltipProps };
