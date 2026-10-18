'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  monthlyBudget: number;
  spent: number;
  rolloverEnabled: boolean;
  rolloverBalance: number;
  rolloverCap?: number;
}

interface BudgetRolloverProps {
  categories?: BudgetCategory[];
  currentMonth?: string;
  className?: string;
}

const demoCategories: BudgetCategory[] = [
  {
    id: 'c1',
    name: 'Groceries',
    icon: '🛒',
    monthlyBudget: 15000,
    spent: 12500,
    rolloverEnabled: true,
    rolloverBalance: 2500,
    rolloverCap: 5000,
  },
  {
    id: 'c2',
    name: 'Dining Out',
    icon: '🍽️',
    monthlyBudget: 8000,
    spent: 9500,
    rolloverEnabled: true,
    rolloverBalance: -1500,
    rolloverCap: 4000,
  },
  {
    id: 'c3',
    name: 'Entertainment',
    icon: '🎬',
    monthlyBudget: 5000,
    spent: 3000,
    rolloverEnabled: true,
    rolloverBalance: 4500,
    rolloverCap: 10000,
  },
  {
    id: 'c4',
    name: 'Transportation',
    icon: '🚗',
    monthlyBudget: 6000,
    spent: 5800,
    rolloverEnabled: true,
    rolloverBalance: 200,
  },
  {
    id: 'c5',
    name: 'Shopping',
    icon: '🛍️',
    monthlyBudget: 10000,
    spent: 10000,
    rolloverEnabled: false,
    rolloverBalance: 0,
  },
  {
    id: 'c6',
    name: 'Utilities',
    icon: '💡',
    monthlyBudget: 8000,
    spent: 7200,
    rolloverEnabled: true,
    rolloverBalance: 800,
  },
];

export function BudgetRollover({
  categories = demoCategories,
  currentMonth = 'January 2024',
  className,
}: BudgetRolloverProps) {
  const stats = useMemo(() => {
    const totalBudget = categories.reduce((sum, c) => sum + c.monthlyBudget, 0);
    const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
    const totalRollover = categories.reduce((sum, c) => sum + c.rolloverBalance, 0);
    const availableBalance = categories.reduce((sum, c) => {
      const available = c.monthlyBudget - c.spent + (c.rolloverEnabled ? c.rolloverBalance : 0);
      return sum + Math.max(0, available);
    }, 0);

    return { totalBudget, totalSpent, totalRollover, availableBalance };
  }, [categories]);

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => b.rolloverBalance - a.rolloverBalance);
  }, [categories]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🔄</span>
            Budget Rollover
          </span>
          <span className="text-sm font-normal text-gray-500">{currentMonth}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Monthly Budget</p>
            <p className="text-xl font-bold text-blue-700">₱{stats.totalBudget.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-600 mb-1">Spent</p>
            <p className="text-xl font-bold text-orange-700">₱{stats.totalSpent.toLocaleString()}</p>
          </div>
          <div className={`rounded-xl p-4 text-center ${stats.totalRollover >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`text-xs mb-1 ${stats.totalRollover >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Rollover Balance
            </p>
            <p className={`text-xl font-bold ${stats.totalRollover >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {stats.totalRollover >= 0 ? '+' : ''}₱{stats.totalRollover.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Available</p>
            <p className="text-xl font-bold text-purple-700">₱{stats.availableBalance.toLocaleString()}</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <h4 className="font-medium text-blue-900 mb-2">💡 How Rollover Works</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Unspent budget carries over to next month</li>
            <li>• Overspending creates negative rollover (debt to yourself)</li>
            <li>• Set caps to prevent excessive accumulation</li>
            <li>• Perfect for irregular expenses like shopping or entertainment</li>
          </ul>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          {sortedCategories.map((category) => {
            const effectiveBudget = category.monthlyBudget + (category.rolloverEnabled ? category.rolloverBalance : 0);
            const remaining = effectiveBudget - category.spent;
            const spentPercent = (category.spent / effectiveBudget) * 100;
            const nextMonthRollover = remaining;
            const cappedRollover = category.rolloverCap
              ? Math.min(nextMonthRollover, category.rolloverCap)
              : nextMonthRollover;

            return (
              <div
                key={category.id}
                className={`p-4 rounded-xl border-2 ${
                  remaining < 0
                    ? 'border-red-300 bg-red-50'
                    : category.rolloverBalance > 0
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{category.name}</p>
                      <p className="text-xs text-gray-500">
                        Base: ₱{category.monthlyBudget.toLocaleString()}
                        {category.rolloverEnabled && category.rolloverBalance !== 0 && (
                          <span className={category.rolloverBalance > 0 ? 'text-green-600' : 'text-red-600'}>
                            {' '}+ ₱{category.rolloverBalance.toLocaleString()} rollover
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-500">Rollover</label>
                    <button
                      className={`w-10 h-5 rounded-full transition-colors ${
                        category.rolloverEnabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                          category.rolloverEnabled ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        spentPercent > 100 ? 'bg-red-500' :
                        spentPercent > 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(spentPercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₱{category.spent.toLocaleString()} spent</span>
                    <span>₱{effectiveBudget.toLocaleString()} budget</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between text-sm">
                  <div className={`font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {remaining >= 0 ? `₱${remaining.toLocaleString()} remaining` : `₱${Math.abs(remaining).toLocaleString()} over budget`}
                  </div>
                  {category.rolloverEnabled && (
                    <div className="text-xs text-gray-500">
                      Next month: {cappedRollover >= 0 ? '+' : ''}₱{cappedRollover.toLocaleString()}
                      {category.rolloverCap && nextMonthRollover > category.rolloverCap && (
                        <span className="text-orange-600"> (capped)</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Rollover Cap Setting */}
                {category.rolloverEnabled && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Rollover cap:</span>
                      <div className="flex items-center gap-2">
                        {category.rolloverCap ? (
                          <span className="font-medium">₱{category.rolloverCap.toLocaleString()}</span>
                        ) : (
                          <span className="text-gray-400">No cap</span>
                        )}
                        <button className="text-blue-600 hover:underline">Edit</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-amber-50 rounded-xl">
          <h4 className="font-medium text-amber-900 mb-2">🎯 Rollover Best Practices</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Enable rollover for variable expenses (entertainment, shopping)</li>
            <li>• Disable for fixed expenses (rent, subscriptions)</li>
            <li>• Set caps to prevent budget bloat</li>
            <li>• Review and reset quarterly if needed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
