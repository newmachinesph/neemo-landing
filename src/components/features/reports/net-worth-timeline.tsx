'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface NetWorthDataPoint {
  date: string;
  assets: number;
  liabilities: number;
  netWorth: number;
}

interface AssetBreakdown {
  category: string;
  icon: string;
  amount: number;
  change: number;
}

interface NetWorthTimelineProps {
  dataPoints: NetWorthDataPoint[];
  assetBreakdown: AssetBreakdown[];
  liabilityBreakdown: AssetBreakdown[];
  currency?: string;
  className?: string;
}

export function NetWorthTimeline({
  dataPoints,
  assetBreakdown,
  liabilityBreakdown,
  currency = '₱',
  className,
}: NetWorthTimelineProps) {
  const current = dataPoints[dataPoints.length - 1];
  const previous = dataPoints[dataPoints.length - 2];

  const stats = useMemo(() => {
    if (!current) return null;

    const monthChange = previous ? current.netWorth - previous.netWorth : 0;
    const yearStart = dataPoints.find(
      (d) => new Date(d.date).getFullYear() === new Date(current.date).getFullYear() &&
             new Date(d.date).getMonth() === 0
    );
    const ytdChange = yearStart ? current.netWorth - yearStart.netWorth : 0;
    const allTimeChange = dataPoints.length > 0 ? current.netWorth - dataPoints[0].netWorth : 0;

    // Calculate chart dimensions
    const maxValue = Math.max(...dataPoints.map((d) => d.netWorth));
    const minValue = Math.min(...dataPoints.map((d) => d.netWorth));
    const range = maxValue - minValue || 1;

    return { monthChange, ytdChange, allTimeChange, maxValue, minValue, range };
  }, [dataPoints, current, previous]);

  if (!current || !stats) {
    return (
      <Card className={className}>
        <CardContent className="py-8 text-center text-gray-500">
          <div className="text-4xl mb-2">📈</div>
          <p>No net worth data available</p>
        </CardContent>
      </Card>
    );
  }

  const totalAssets = assetBreakdown.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = liabilityBreakdown.reduce((sum, l) => sum + l.amount, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📈</span>
          Net Worth Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Net Worth */}
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl text-center">
          <p className="text-sm text-gray-600 mb-1">Current Net Worth</p>
          <p className={cn(
            'text-4xl font-bold',
            current.netWorth >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {current.netWorth >= 0 ? '' : '-'}{currency}{Math.abs(current.netWorth).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            as of {new Date(current.date).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Change Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">This Month</p>
            <p className={cn(
              'text-lg font-bold',
              stats.monthChange >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {stats.monthChange >= 0 ? '+' : ''}{currency}{stats.monthChange.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Year to Date</p>
            <p className={cn(
              'text-lg font-bold',
              stats.ytdChange >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {stats.ytdChange >= 0 ? '+' : ''}{currency}{stats.ytdChange.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">All Time</p>
            <p className={cn(
              'text-lg font-bold',
              stats.allTimeChange >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {stats.allTimeChange >= 0 ? '+' : ''}{currency}{stats.allTimeChange.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Simple Chart */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="h-40 flex items-end gap-1">
            {dataPoints.slice(-12).map((point, index) => {
              const height = ((point.netWorth - stats.minValue) / stats.range) * 100;
              const isLast = index === dataPoints.slice(-12).length - 1;

              return (
                <div
                  key={point.date}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    className={cn(
                      'w-full rounded-t transition-all',
                      point.netWorth >= 0 ? 'bg-green-400' : 'bg-red-400',
                      isLast && 'bg-blue-500'
                    )}
                    style={{ height: `${Math.max(5, height)}%` }}
                  />
                  <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">
                    {new Date(point.date).toLocaleDateString('en-PH', { month: 'short' }).charAt(0)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assets vs Liabilities */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Assets */}
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-green-700">Assets</span>
              <span className="font-bold text-green-700">
                {currency}{totalAssets.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              {assetBreakdown.slice(0, 4).map((asset) => (
                <div key={asset.category} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <span>{asset.icon}</span>
                    {asset.category}
                  </span>
                  <span className="text-gray-900">{currency}{asset.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities */}
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-red-700">Liabilities</span>
              <span className="font-bold text-red-700">
                {currency}{totalLiabilities.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              {liabilityBreakdown.slice(0, 4).map((liability) => (
                <div key={liability.category} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <span>{liability.icon}</span>
                    {liability.category}
                  </span>
                  <span className="text-gray-900">{currency}{liability.amount.toLocaleString()}</span>
                </div>
              ))}
              {liabilityBreakdown.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-2">No liabilities! 🎉</p>
              )}
            </div>
          </div>
        </div>

        {/* Visual Ratio */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-500">Assets vs Liabilities</span>
            <span className="text-gray-700">
              {((totalAssets / (totalAssets + totalLiabilities || 1)) * 100).toFixed(0)}% Assets
            </span>
          </div>
          <div className="w-full h-4 bg-red-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${(totalAssets / (totalAssets + totalLiabilities || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Milestones */}
        <div className="p-4 bg-yellow-50 rounded-xl">
          <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <span>🎯</span>
            Net Worth Goals
          </h4>
          <div className="space-y-2">
            {[100000, 500000, 1000000].map((milestone) => {
              const reached = current.netWorth >= milestone;
              const progress = Math.min(100, (current.netWorth / milestone) * 100);

              return (
                <div key={milestone}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className={reached ? 'text-green-600 font-medium' : 'text-gray-600'}>
                      {reached ? '✓' : '○'} {currency}{milestone.toLocaleString()}
                    </span>
                    <span className={reached ? 'text-green-600' : 'text-gray-500'}>
                      {reached ? 'Achieved!' : `${progress.toFixed(0)}%`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        reached ? 'bg-green-500' : 'bg-blue-400'
                      )}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export type { NetWorthDataPoint, AssetBreakdown };
