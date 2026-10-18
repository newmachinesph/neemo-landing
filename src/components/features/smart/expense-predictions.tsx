'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface MonthlyTrend {
  month: string;
  amount: number;
}

interface CategoryPrediction {
  category: string;
  icon: string;
  predictedAmount: number;
  lastMonthAmount: number;
  averageAmount: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

interface ExpensePredictionsProps {
  monthlyHistory: MonthlyTrend[];
  categoryPredictions: CategoryPrediction[];
  daysRemaining: number;
  currentSpending: number;
  currency?: string;
  className?: string;
}

const predictMonthlyTotal = (history: MonthlyTrend[]): number => {
  if (history.length === 0) return 0;
  if (history.length < 3) {
    return history.reduce((sum, h) => sum + h.amount, 0) / history.length;
  }

  // Simple weighted moving average
  const weights = [0.5, 0.3, 0.2];
  const recent = history.slice(-3).reverse();
  return recent.reduce((sum, h, i) => sum + h.amount * weights[i], 0);
};

export function ExpensePredictions({
  monthlyHistory,
  categoryPredictions,
  daysRemaining,
  currentSpending,
  currency = '₱',
  className,
}: ExpensePredictionsProps) {
  const predictedTotal = useMemo(() => predictMonthlyTotal(monthlyHistory), [monthlyHistory]);
  const dailyRate = currentSpending / (30 - daysRemaining);
  const projectedTotal = dailyRate * 30;
  const lastMonth = monthlyHistory[monthlyHistory.length - 1]?.amount || 0;

  const projectionDiff = projectedTotal - predictedTotal;
  const isOverPrediction = projectionDiff > 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🔮</span>
          Expense Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Monthly Prediction */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Predicted Monthly Spending</p>
            <p className="text-4xl font-bold text-gray-900">
              {currency}{Math.round(predictedTotal).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Based on your spending history
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">At Current Pace</p>
              <p className={cn(
                'text-lg font-bold',
                isOverPrediction ? 'text-red-600' : 'text-green-600'
              )}>
                {currency}{Math.round(projectedTotal).toLocaleString()}
              </p>
              <p className={cn(
                'text-xs',
                isOverPrediction ? 'text-red-500' : 'text-green-500'
              )}>
                {isOverPrediction ? '+' : ''}{currency}{Math.round(Math.abs(projectionDiff)).toLocaleString()}
                {isOverPrediction ? ' over' : ' under'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Days Remaining</p>
              <p className="text-lg font-bold text-gray-900">{daysRemaining}</p>
              <p className="text-xs text-gray-500">
                {currency}{Math.round(dailyRate).toLocaleString()}/day
              </p>
            </div>
          </div>
        </div>

        {/* Daily Budget Suggestion */}
        <div className="mb-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Suggested Daily Budget</p>
              <p className="text-xs text-blue-600">To stay within prediction</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-700">
                {currency}{Math.round((predictedTotal - currentSpending) / daysRemaining).toLocaleString()}
              </p>
              <p className="text-xs text-blue-500">per day remaining</p>
            </div>
          </div>
        </div>

        {/* Category Predictions */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">By Category</h4>
          <div className="space-y-3">
            {categoryPredictions.map((prediction) => {
              const changePercent = prediction.lastMonthAmount > 0
                ? ((prediction.predictedAmount - prediction.lastMonthAmount) / prediction.lastMonthAmount) * 100
                : 0;

              return (
                <div
                  key={prediction.category}
                  className="p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{prediction.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{prediction.category}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{Math.round(prediction.confidence * 100)}% confidence</span>
                          <span
                            className={cn(
                              'flex items-center gap-0.5',
                              prediction.trend === 'up' ? 'text-red-500' :
                              prediction.trend === 'down' ? 'text-green-500' :
                              'text-gray-500'
                            )}
                          >
                            {prediction.trend === 'up' && '↑'}
                            {prediction.trend === 'down' && '↓'}
                            {prediction.trend === 'stable' && '→'}
                            {prediction.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {currency}{prediction.predictedAmount.toLocaleString()}
                      </p>
                      {changePercent !== 0 && (
                        <p className={cn(
                          'text-xs',
                          changePercent > 0 ? 'text-red-500' : 'text-green-500'
                        )}>
                          {changePercent > 0 ? '+' : ''}{Math.round(changePercent)}% vs last month
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mini trend chart */}
                  <div className="flex items-end gap-1 h-8 mt-2">
                    {[0.6, 0.8, 0.7, 0.9, 1].map((h, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex-1 rounded-t',
                          i === 4 ? 'bg-blue-500' : 'bg-gray-200'
                        )}
                        style={{ height: `${h * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison with Last Month */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Month Total</span>
            <span className="font-semibold text-gray-900">
              {currency}{lastMonth.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">Predicted Change</span>
            <span className={cn(
              'font-semibold',
              predictedTotal > lastMonth ? 'text-red-600' : 'text-green-600'
            )}>
              {predictedTotal > lastMonth ? '+' : ''}{currency}{Math.round(predictedTotal - lastMonth).toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Savings Autopilot component
interface SavingsRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'roundup';
  value: number;
  targetGoal?: string;
  isActive: boolean;
}

interface SavingsAutopilotProps {
  rules: SavingsRule[];
  estimatedMonthlySavings: number;
  onToggleRule: (ruleId: string) => void;
  onAddRule: () => void;
  currency?: string;
}

export function SavingsAutopilot({
  rules,
  estimatedMonthlySavings,
  onToggleRule,
  onAddRule,
  currency = '₱',
}: SavingsAutopilotProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🤖</span>
          Savings Autopilot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-green-50 rounded-xl text-center">
          <p className="text-sm text-green-600 mb-1">Estimated Auto-Savings</p>
          <p className="text-3xl font-bold text-green-700">
            {currency}{estimatedMonthlySavings.toLocaleString()}/mo
          </p>
        </div>

        <div className="space-y-3">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={cn(
                'p-4 rounded-xl border transition-colors',
                rule.isActive ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{rule.name}</p>
                  <p className="text-sm text-gray-500">
                    {rule.type === 'percentage' && `${rule.value}% of income`}
                    {rule.type === 'fixed' && `${currency}${rule.value} per payday`}
                    {rule.type === 'roundup' && `Round up to nearest ${currency}${rule.value}`}
                    {rule.targetGoal && ` → ${rule.targetGoal}`}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.isActive}
                    onChange={() => onToggleRule(rule.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onAddRule}
          className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          + Add Savings Rule
        </button>
      </CardContent>
    </Card>
  );
}

export { predictMonthlyTotal };
export type { MonthlyTrend, CategoryPrediction, SavingsRule };
