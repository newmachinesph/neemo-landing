'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Progress, Badge } from '@/components/ui';
import { formatCurrency, calculatePercentage, getDaysRemaining } from '@/lib/utils';
import { Goal } from '@/types';
import { ArrowRightIcon, FlagIcon } from '@heroicons/react/24/outline';

interface GoalsSummaryProps {
  goals: Goal[];
}

export function GoalsSummary({ goals }: GoalsSummaryProps) {
  const activeGoals = goals.filter((g) => g.status === 'active');
  const totalSaved = activeGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = activeGoals.reduce((sum, g) => sum + g.targetAmount, 0);

  // Show top 3 goals by priority
  const priorityGoals = activeGoals
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, 'danger' | 'warning' | 'success'> = {
      high: 'danger',
      medium: 'warning',
      low: 'success',
    };
    return variants[priority] || 'secondary';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Financial Goals</CardTitle>
        <Link
          href="/goals"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall progress */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm text-blue-700">Total Saved</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalSaved)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-700">Target</p>
              <p className="text-lg font-semibold text-blue-900">{formatCurrency(totalTarget)}</p>
            </div>
          </div>

          {/* Goal list */}
          <div className="space-y-4">
            {priorityGoals.map((goal) => {
              const percentage = calculatePercentage(goal.currentAmount, goal.targetAmount);
              const daysLeft = getDaysRemaining(goal.targetDate);

              return (
                <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg"
                        style={{ backgroundColor: `${goal.color}20` }}
                      >
                        <FlagIcon className="w-4 h-4" style={{ color: goal.color }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                        <p className="text-xs text-gray-500">
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getPriorityBadge(goal.priority)}>
                      {goal.priority}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{formatCurrency(goal.currentAmount)}</span>
                      <span className="text-gray-500">{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <Progress value={percentage} size="sm" variant="success" />
                    <p className="text-xs text-gray-500 text-right">{percentage.toFixed(0)}% complete</p>
                  </div>
                </div>
              );
            })}
          </div>

          {activeGoals.length === 0 && (
            <div className="text-center py-6">
              <FlagIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No active goals</p>
              <Link href="/goals" className="text-sm text-blue-600 hover:underline">
                Create your first goal
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
