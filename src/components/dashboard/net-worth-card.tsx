'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface NetWorthCardProps {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  change?: number;
}

export function NetWorthCard({ totalAssets, totalLiabilities, netWorth, change = 5.2 }: NetWorthCardProps) {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Net Worth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(netWorth)}</p>
            <div className="flex items-center gap-1 mt-1">
              {change >= 0 ? (
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">Total Assets</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalAssets)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-gray-600">Total Liabilities</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalLiabilities)}</span>
            </div>
          </div>

          {/* Visual bar */}
          <div className="mt-4">
            <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
              <div
                className="bg-green-500"
                style={{ width: `${(totalAssets / (totalAssets + totalLiabilities)) * 100}%` }}
              />
              <div
                className="bg-red-500"
                style={{ width: `${(totalLiabilities / (totalAssets + totalLiabilities)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
