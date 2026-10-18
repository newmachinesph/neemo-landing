'use client';

import { forwardRef, HTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';
  shortcut?: string;
}

interface QuickActionsProps extends HTMLAttributes<HTMLDivElement> {
  actions: QuickAction[];
  columns?: 2 | 3 | 6;
}

const colorStyles = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    hover: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-blue-500/20',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
    hover: 'group-hover:bg-green-100 dark:group-hover:bg-green-900/50',
    gradient: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-500/20',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
    hover: 'group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50',
    gradient: 'from-purple-500 to-purple-600',
    glow: 'shadow-purple-500/20',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/30',
    text: 'text-orange-600 dark:text-orange-400',
    hover: 'group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50',
    gradient: 'from-orange-500 to-orange-600',
    glow: 'shadow-orange-500/20',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
    hover: 'group-hover:bg-red-100 dark:group-hover:bg-red-900/50',
    gradient: 'from-red-500 to-red-600',
    glow: 'shadow-red-500/20',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    text: 'text-teal-600 dark:text-teal-400',
    hover: 'group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50',
    gradient: 'from-teal-500 to-teal-600',
    glow: 'shadow-teal-500/20',
  },
};

const QuickActionButton = forwardRef<HTMLButtonElement, { action: QuickAction }>(
  ({ action }, ref) => {
    const color = action.color || 'blue';
    const styles = colorStyles[color];

    const content = (
      <>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
            styles.bg,
            styles.text,
            styles.hover,
            'group-hover:scale-110 group-hover:shadow-lg',
            styles.glow
          )}
        >
          {action.icon}
        </div>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white text-center transition-colors duration-200">
          {action.label}
        </span>
        {action.shortcut && (
          <span className="hidden sm:block text-[10px] text-gray-400 dark:text-gray-500 font-mono">
            {action.shortcut}
          </span>
        )}
      </>
    );

    const className = cn(
      'group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800',
      'quick-action-card',
      color === 'blue' && 'focus:ring-blue-500',
      color === 'green' && 'focus:ring-green-500',
      color === 'purple' && 'focus:ring-purple-500',
      color === 'orange' && 'focus:ring-orange-500',
      color === 'red' && 'focus:ring-red-500',
      color === 'teal' && 'focus:ring-teal-500'
    );

    if (action.href) {
      return (
        <Link href={action.href} className={className}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        onClick={action.onClick}
        className={className}
      >
        {content}
      </button>
    );
  }
);
QuickActionButton.displayName = 'QuickActionButton';

const QuickActions = forwardRef<HTMLDivElement, QuickActionsProps>(
  ({ className, actions, columns = 6, ...props }, ref) => {
    const gridCols = {
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      6: 'grid-cols-3 sm:grid-cols-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-4',
          className
        )}
        {...props}
      >
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Quick Actions</h3>
        <div className={cn('grid gap-2', gridCols[columns])}>
          {actions.map((action) => (
            <QuickActionButton key={action.id} action={action} />
          ))}
        </div>
      </div>
    );
  }
);
QuickActions.displayName = 'QuickActions';

// Pre-built action icons for common finance actions
const QuickActionIcons = {
  AddTransaction: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Transfer: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  PayBill: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  SetBudget: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  AddGoal: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  ViewReports: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export { QuickActions, QuickActionButton, QuickActionIcons };
export type { QuickAction, QuickActionsProps };
