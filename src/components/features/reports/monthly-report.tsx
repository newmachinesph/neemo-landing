'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CategoryBreakdown {
  category: string;
  icon: string;
  amount: number;
  percentage: number;
  change: number;
}

interface MonthlyReportData {
  month: string;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
  previousMonthSavings?: number;
  categoryBreakdown: CategoryBreakdown[];
  topExpenses: { description: string; amount: number; category: string }[];
  insights: string[];
}

interface MonthlyReportProps {
  data: MonthlyReportData;
  onExportPDF?: () => void;
  onExportImage?: () => void;
  onShare?: () => void;
  currency?: string;
  className?: string;
}

export function MonthlyReport({
  data,
  onExportPDF,
  onExportImage,
  onShare,
  currency = '₱',
  className,
}: MonthlyReportProps) {
  const savingsChange = data.previousMonthSavings !== undefined
    ? data.netSavings - data.previousMonthSavings
    : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📊</span>
            Monthly Report
          </span>
          <span className="text-sm font-normal text-gray-500">
            {new Date(data.month).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Income</p>
            <p className="text-xl font-bold text-green-700">
              {currency}{data.totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-xs text-red-600 mb-1">Expenses</p>
            <p className="text-xl font-bold text-red-700">
              {currency}{data.totalExpenses.toLocaleString()}
            </p>
          </div>
          <div className={cn(
            'rounded-xl p-4 text-center',
            data.netSavings >= 0 ? 'bg-blue-50' : 'bg-orange-50'
          )}>
            <p className={cn('text-xs mb-1', data.netSavings >= 0 ? 'text-blue-600' : 'text-orange-600')}>
              Net Savings
            </p>
            <p className={cn('text-xl font-bold', data.netSavings >= 0 ? 'text-blue-700' : 'text-orange-700')}>
              {data.netSavings >= 0 ? '+' : ''}{currency}{data.netSavings.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Savings Rate</p>
            <p className="text-xl font-bold text-purple-700">
              {data.savingsRate.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Month over Month */}
        {savingsChange !== 0 && (
          <div className={cn(
            'mb-6 p-4 rounded-xl flex items-center justify-between',
            savingsChange > 0 ? 'bg-green-50' : 'bg-red-50'
          )}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{savingsChange > 0 ? '📈' : '📉'}</span>
              <div>
                <p className="font-medium text-gray-900">
                  {savingsChange > 0 ? 'Great job!' : 'Room for improvement'}
                </p>
                <p className="text-sm text-gray-600">
                  Compared to last month
                </p>
              </div>
            </div>
            <span className={cn(
              'text-lg font-bold',
              savingsChange > 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {savingsChange > 0 ? '+' : ''}{currency}{savingsChange.toLocaleString()}
            </span>
          </div>
        )}

        {/* Category Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Spending by Category</h4>
          <div className="space-y-3">
            {data.categoryBreakdown.slice(0, 5).map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span className="text-sm text-gray-700">{cat.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {currency}{cat.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">({cat.percentage}%)</span>
                    {cat.change !== 0 && (
                      <span className={cn(
                        'text-xs',
                        cat.change < 0 ? 'text-green-600' : 'text-red-600'
                      )}>
                        {cat.change > 0 ? '+' : ''}{cat.change}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Expenses */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Top 5 Expenses</h4>
          <div className="space-y-2">
            {data.topExpenses.slice(0, 5).map((expense, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                  <p className="text-xs text-gray-500">{expense.category}</p>
                </div>
                <span className="font-semibold text-gray-900">
                  {currency}{expense.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        {data.insights.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-xl">
            <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-2">
              <span>💡</span>
              Monthly Insights
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {data.insights.map((insight, index) => (
                <li key={index}>• {insight}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Export Actions */}
        <div className="flex gap-2">
          {onExportPDF && (
            <Button variant="outline" onClick={onExportPDF} className="flex-1">
              📄 Export PDF
            </Button>
          )}
          {onExportImage && (
            <Button variant="outline" onClick={onExportImage} className="flex-1">
              🖼️ Save Image
            </Button>
          )}
          {onShare && (
            <Button onClick={onShare} className="flex-1">
              📤 Share
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export type { MonthlyReportData, CategoryBreakdown };
