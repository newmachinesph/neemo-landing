'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Progress, Badge } from '@/components/ui';
import { formatCurrency, calculatePercentage, getBudgetStatus } from '@/lib/utils';
import { BudgetCategory } from '@/types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface BudgetSummaryProps {
  budgets: BudgetCategory[];
  totalBudget: number;
  totalSpent: number;
}

export function BudgetSummary({ budgets, totalBudget, totalSpent }: BudgetSummaryProps) {
  const overallPercentage = calculatePercentage(totalSpent, totalBudget);
  const remaining = totalBudget - totalSpent;

  // Get top 4 budget categories by spending
  const topBudgets = [...budgets]
    .sort((a, b) => b.spentAmount - a.spentAmount)
    .slice(0, 4);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Budget Overview</CardTitle>
        <Link
          href="/budget"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall progress */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-gray-600">
                {formatCurrency(totalSpent)} of {formatCurrency(totalBudget)}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(remaining)} left
              </span>
            </div>
            <Progress value={overallPercentage} size="lg" />
          </div>

          {/* Category breakdown */}
          <div className="space-y-3">
            {topBudgets.map((budget) => {
              const percentage = calculatePercentage(budget.spentAmount, budget.budgetAmount);
              const status = getBudgetStatus(budget.spentAmount, budget.budgetAmount);

              return (
                <div key={budget.id} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: budget.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {budget.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatCurrency(budget.spentAmount)} / {formatCurrency(budget.budgetAmount)}
                      </span>
                    </div>
                    <Progress value={percentage} size="sm" />
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
