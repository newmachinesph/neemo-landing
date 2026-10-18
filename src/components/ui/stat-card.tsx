'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    label?: string;
  };
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  variant?: 'default' | 'glass';
  className?: string;
}

export function StatCard({ title, value, change, icon, trend, variant = 'default', className }: StatCardProps) {
  const getTrendColor = () => {
    if (!trend) return '';
    if (trend === 'up') return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/15';
    if (trend === 'down') return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/15';
    return 'text-gray-600 dark:text-white/60 bg-gray-50 dark:bg-white/10';
  };

  const getTrendIconBg = () => {
    if (!trend) return 'bg-gray-50 dark:bg-white/10';
    if (trend === 'up') return 'bg-green-50 dark:bg-green-500/15';
    if (trend === 'down') return 'bg-red-50 dark:bg-red-500/15';
    return 'bg-gray-50 dark:bg-white/10';
  };

  const variants = {
    default: 'bg-white dark:bg-white/[0.06] border border-gray-200 dark:border-white/10',
    glass: 'glass-card',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6 stat-card',
        variants[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-white/60">{title}</p>
        {icon && (
          <div className={cn(
            'flex items-center justify-center w-10 h-10 rounded-xl transition-transform duration-300 hover:scale-110',
            getTrendIconBg()
          )}>
            {icon}
          </div>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      {change && (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
              getTrendColor()
            )}
          >
            {trend === 'up' && <ArrowUpIcon className="h-3 w-3" />}
            {trend === 'down' && <ArrowDownIcon className="h-3 w-3" />}
            {change.value > 0 ? '+' : ''}{change.value}%
          </span>
          {change.label && (
            <span className="text-xs text-gray-500 dark:text-white/50">{change.label}</span>
          )}
        </div>
      )}
    </div>
  );
}
