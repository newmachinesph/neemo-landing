'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  lifestyle: number;
}

interface CategoryTrend {
  category: string;
  icon: string;
  lastYear: number;
  thisYear: number;
  change: number;
  changePercent: number;
}

interface LifestyleInflationProps {
  monthlyData?: MonthlyData[];
  categoryTrends?: CategoryTrend[];
  incomeGrowth?: number;
  className?: string;
}

const demoMonthlyData: MonthlyData[] = [
  { month: '2023-01', income: 50000, expenses: 35000, savings: 15000, lifestyle: 25000 },
  { month: '2023-06', income: 55000, expenses: 40000, savings: 15000, lifestyle: 28000 },
  { month: '2023-12', income: 60000, expenses: 45000, savings: 15000, lifestyle: 32000 },
  { month: '2024-01', income: 65000, expenses: 50000, savings: 15000, lifestyle: 35000 },
];

const demoCategoryTrends: CategoryTrend[] = [
  { category: 'Dining Out', icon: '🍽️', lastYear: 5000, thisYear: 8000, change: 3000, changePercent: 60 },
  { category: 'Subscriptions', icon: '📺', lastYear: 1500, thisYear: 2800, change: 1300, changePercent: 87 },
  { category: 'Shopping', icon: '🛍️', lastYear: 4000, thisYear: 6500, change: 2500, changePercent: 63 },
  { category: 'Transportation', icon: '🚗', lastYear: 3000, thisYear: 4500, change: 1500, changePercent: 50 },
  { category: 'Groceries', icon: '🛒', lastYear: 12000, thisYear: 14000, change: 2000, changePercent: 17 },
  { category: 'Entertainment', icon: '🎬', lastYear: 2000, thisYear: 3500, change: 1500, changePercent: 75 },
];

export function LifestyleInflation({
  monthlyData = demoMonthlyData,
  categoryTrends = demoCategoryTrends,
  incomeGrowth = 30,
  className,
}: LifestyleInflationProps) {
  const stats = useMemo(() => {
    const firstMonth = monthlyData[0];
    const lastMonth = monthlyData[monthlyData.length - 1];

    const lifestyleGrowth = ((lastMonth.lifestyle - firstMonth.lifestyle) / firstMonth.lifestyle) * 100;
    const savingsGrowth = ((lastMonth.savings - firstMonth.savings) / firstMonth.savings) * 100;
    const expenseGrowth = ((lastMonth.expenses - firstMonth.expenses) / firstMonth.expenses) * 100;

    const lifestyleInflationRatio = lifestyleGrowth / incomeGrowth;
    const isHealthy = lifestyleInflationRatio < 0.5;

    return {
      lifestyleGrowth,
      savingsGrowth,
      expenseGrowth,
      lifestyleInflationRatio,
      isHealthy,
      firstMonth,
      lastMonth,
    };
  }, [monthlyData, incomeGrowth]);

  const sortedTrends = useMemo(() => {
    return [...categoryTrends].sort((a, b) => b.changePercent - a.changePercent);
  }, [categoryTrends]);

  const totalInflation = categoryTrends.reduce((sum, c) => sum + c.change, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📊</span>
          Lifestyle Inflation Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Health Status */}
        <div className={`mb-6 p-4 rounded-xl ${
          stats.isHealthy
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
            : 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{stats.isHealthy ? '✅' : '⚠️'}</span>
            <div>
              <p className={`font-semibold ${stats.isHealthy ? 'text-green-800' : 'text-red-800'}`}>
                {stats.isHealthy ? 'Lifestyle Creep Under Control' : 'Warning: High Lifestyle Inflation'}
              </p>
              <p className={`text-sm ${stats.isHealthy ? 'text-green-600' : 'text-red-600'}`}>
                Your lifestyle expenses grew {stats.lifestyleGrowth.toFixed(0)}% while income grew {incomeGrowth}%
              </p>
            </div>
          </div>
          <p className={`text-xs ${stats.isHealthy ? 'text-green-700' : 'text-red-700'}`}>
            💡 {stats.isHealthy
              ? 'Great job! You\'re keeping expenses in check as your income grows.'
              : 'Consider reviewing discretionary spending to maintain your savings rate.'}
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Income Growth</p>
            <p className="text-xl font-bold text-green-700">+{incomeGrowth}%</p>
          </div>
          <div className={`rounded-xl p-4 text-center ${
            stats.lifestyleGrowth > incomeGrowth ? 'bg-red-50' : 'bg-blue-50'
          }`}>
            <p className={`text-xs mb-1 ${stats.lifestyleGrowth > incomeGrowth ? 'text-red-600' : 'text-blue-600'}`}>
              Lifestyle Growth
            </p>
            <p className={`text-xl font-bold ${stats.lifestyleGrowth > incomeGrowth ? 'text-red-700' : 'text-blue-700'}`}>
              +{stats.lifestyleGrowth.toFixed(0)}%
            </p>
          </div>
          <div className={`rounded-xl p-4 text-center ${
            stats.savingsGrowth > 0 ? 'bg-purple-50' : 'bg-orange-50'
          }`}>
            <p className={`text-xs mb-1 ${stats.savingsGrowth > 0 ? 'text-purple-600' : 'text-orange-600'}`}>
              Savings Growth
            </p>
            <p className={`text-xl font-bold ${stats.savingsGrowth > 0 ? 'text-purple-700' : 'text-orange-700'}`}>
              {stats.savingsGrowth > 0 ? '+' : ''}{stats.savingsGrowth.toFixed(0)}%
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-600 mb-1">Total Creep</p>
            <p className="text-xl font-bold text-orange-700">₱{totalInflation.toLocaleString()}/mo</p>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Income vs Lifestyle vs Savings</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Income</span>
                <span className="font-medium text-gray-900">
                  ₱{stats.firstMonth.income.toLocaleString()} → ₱{stats.lastMonth.income.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Lifestyle Expenses</span>
                <span className="font-medium text-gray-900">
                  ₱{stats.firstMonth.lifestyle.toLocaleString()} → ₱{stats.lastMonth.lifestyle.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${stats.lifestyleGrowth > incomeGrowth ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ width: `${(stats.lifestyleGrowth / incomeGrowth) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Savings</span>
                <span className="font-medium text-gray-900">
                  ₱{stats.firstMonth.savings.toLocaleString()} → ₱{stats.lastMonth.savings.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${Math.max(0, (stats.savingsGrowth / incomeGrowth) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Biggest Increases by Category</h4>
          <div className="space-y-3">
            {sortedTrends.slice(0, 5).map((trend) => (
              <div
                key={trend.category}
                className={`p-3 rounded-xl ${
                  trend.changePercent > 50 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{trend.icon}</span>
                    <span className="font-medium text-gray-900">{trend.category}</span>
                  </div>
                  <span className={`font-bold ${trend.changePercent > 50 ? 'text-red-600' : 'text-orange-600'}`}>
                    +{trend.changePercent}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₱{trend.lastYear.toLocaleString()}/mo → ₱{trend.thisYear.toLocaleString()}/mo</span>
                  <span className="text-red-600">+₱{trend.change.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-blue-50 rounded-xl mb-6">
          <h4 className="font-medium text-blue-900 mb-3">💡 Recommendations</h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start gap-2">
              <span>1.</span>
              <span>Review your subscriptions - they&apos;ve grown {sortedTrends.find(t => t.category === 'Subscriptions')?.changePercent}%</span>
            </li>
            <li className="flex items-start gap-2">
              <span>2.</span>
              <span>Set a &quot;raise rule&quot; - save at least 50% of any income increase</span>
            </li>
            <li className="flex items-start gap-2">
              <span>3.</span>
              <span>Track dining expenses more closely - biggest absolute increase</span>
            </li>
            <li className="flex items-start gap-2">
              <span>4.</span>
              <span>Automate savings before spending on lifestyle upgrades</span>
            </li>
          </ul>
        </div>

        {/* The Rule of 50 */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <h4 className="font-medium text-purple-900 mb-2">📏 The 50% Rule</h4>
          <p className="text-sm text-purple-700 mb-2">
            When your income increases, try to save at least 50% of the increase and only allow
            50% to go toward lifestyle upgrades.
          </p>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-2 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Your raise</p>
              <p className="font-semibold text-gray-900">₱{(stats.lastMonth.income - stats.firstMonth.income).toLocaleString()}/mo</p>
            </div>
            <div className="p-2 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Went to savings</p>
              <p className={`font-semibold ${
                (stats.lastMonth.savings - stats.firstMonth.savings) / (stats.lastMonth.income - stats.firstMonth.income) >= 0.5
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {(((stats.lastMonth.savings - stats.firstMonth.savings) / (stats.lastMonth.income - stats.firstMonth.income)) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
