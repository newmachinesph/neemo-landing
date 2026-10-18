'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'default', width, height, style, ...props }, ref) => {
    const variants = {
      default: 'rounded-md',
      circular: 'rounded-full',
      text: 'rounded h-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-gray-200',
          variants[variant],
          className
        )}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

// Card Skeleton
const SkeletonCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton variant="circular" className="h-8 w-8" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-4 w-40" />
    </div>
  )
);
SkeletonCard.displayName = 'SkeletonCard';

// List Skeleton
interface SkeletonListProps extends HTMLAttributes<HTMLDivElement> {
  rows?: number;
  showAvatar?: boolean;
}

const SkeletonList = forwardRef<HTMLDivElement, SkeletonListProps>(
  ({ className, rows = 5, showAvatar = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100',
        className
      )}
      {...props}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          {showAvatar && <Skeleton variant="circular" className="h-10 w-10 flex-shrink-0" />}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      ))}
    </div>
  )
);
SkeletonList.displayName = 'SkeletonList';

// Chart Skeleton
const SkeletonChart = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm p-6',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="flex items-end gap-2 h-48">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-8" />
        ))}
      </div>
    </div>
  )
);
SkeletonChart.displayName = 'SkeletonChart';

// Table Skeleton
interface SkeletonTableProps extends HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
}

const SkeletonTable = forwardRef<HTMLDivElement, SkeletonTableProps>(
  ({ className, rows = 5, columns = 5, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex gap-4 p-4 bg-gray-50 border-b border-gray-200">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 p-4 border-b border-gray-100 last:border-b-0"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-4 flex-1"
              style={{ width: colIndex === 0 ? '30%' : undefined }}
            />
          ))}
        </div>
      ))}
    </div>
  )
);
SkeletonTable.displayName = 'SkeletonTable';

// Full Page Skeleton
const SkeletonPage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('space-y-6', className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkeletonChart />
        </div>
        <div>
          <SkeletonList rows={4} />
        </div>
      </div>
    </div>
  )
);
SkeletonPage.displayName = 'SkeletonPage';

export {
  Skeleton,
  SkeletonCard,
  SkeletonList,
  SkeletonChart,
  SkeletonTable,
  SkeletonPage,
};
export type { SkeletonProps, SkeletonListProps, SkeletonTableProps };
