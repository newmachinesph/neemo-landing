'use client';

import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SpendingInsight {
  id: string;
  type: 'increase' | 'decrease' | 'warning' | 'tip' | 'achievement';
  category: string;
  title: string;
  description: string;
  change?: number;
  amount?: number;
  icon: string;
}

interface SpendingInsightsProps {
  insights: SpendingInsight[];
  currency?: string;
  className?: string;
}

const insightTypeStyles = {
  increase: {
    bg: 'bg-red-50',
    border: 'border-red-100',
    icon: 'bg-red-100 text-red-600',
    badge: 'bg-red-100 text-red-700',
  },
  decrease: {
    bg: 'bg-green-50',
    border: 'border-green-100',
    icon: 'bg-green-100 text-green-600',
    badge: 'bg-green-100 text-green-700',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-100',
    icon: 'bg-yellow-100 text-yellow-600',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  tip: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    icon: 'bg-blue-100 text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
  },
  achievement: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    icon: 'bg-purple-100 text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
  },
};

function InsightCard({
  insight,
  currency = '₱',
}: {
  insight: SpendingInsight;
  currency?: string;
}) {
  const styles = insightTypeStyles[insight.type];

  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-all hover:shadow-md',
        styles.bg,
        styles.border
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-xl', styles.icon)}>
          {insight.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', styles.badge)}>
              {insight.category}
            </span>
            {insight.change !== undefined && (
              <span
                className={cn(
                  'text-xs font-medium flex items-center gap-0.5',
                  insight.change > 0 ? 'text-red-600' : 'text-green-600'
                )}
              >
                {insight.change > 0 ? '↑' : '↓'}
                {Math.abs(insight.change)}%
              </span>
            )}
          </div>
          <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
          <p className="text-sm text-gray-600">{insight.description}</p>
          {insight.amount !== undefined && (
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {currency}
              {insight.amount.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function SpendingInsights({ insights, currency = '₱', className }: SpendingInsightsProps) {
  const sortedInsights = [...insights].sort((a, b) => {
    const priority = { warning: 0, increase: 1, decrease: 2, achievement: 3, tip: 4 };
    return priority[a.type] - priority[b.type];
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💡</span>
          Spending Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p>Keep tracking your expenses to see insights!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} currency={currency} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact version for dashboard
export function SpendingInsightsBadge({
  insights,
  maxItems = 3,
  className,
}: {
  insights: SpendingInsight[];
  maxItems?: number;
  className?: string;
}) {
  const topInsights = insights.slice(0, maxItems);

  return (
    <div className={cn('space-y-2', className)}>
      {topInsights.map((insight) => {
        const styles = insightTypeStyles[insight.type];
        return (
          <div
            key={insight.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg',
              styles.bg,
              styles.border,
              'border'
            )}
          >
            <span className="text-xl">{insight.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{insight.title}</p>
              {insight.change !== undefined && (
                <p
                  className={cn(
                    'text-xs',
                    insight.change > 0 ? 'text-red-600' : 'text-green-600'
                  )}
                >
                  {insight.change > 0 ? '+' : ''}
                  {insight.change}% vs last month
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Demo insights
export const demoSpendingInsights: SpendingInsight[] = [
  {
    id: '1',
    type: 'increase',
    category: 'Food & Dining',
    title: 'You spent 30% more on food this month',
    description: 'Your food expenses increased from ₱8,500 to ₱11,050. Consider meal prepping to save money.',
    change: 30,
    amount: 11050,
    icon: '🍔',
  },
  {
    id: '2',
    type: 'decrease',
    category: 'Transportation',
    title: 'Great job on transportation savings!',
    description: 'You reduced transport costs by 15% this month by using public transit more.',
    change: -15,
    amount: 2500,
    icon: '🚌',
  },
  {
    id: '3',
    type: 'warning',
    category: 'Entertainment',
    title: 'Entertainment budget at 85%',
    description: 'You\'ve used most of your entertainment budget with 10 days left in the month.',
    icon: '🎬',
  },
  {
    id: '4',
    type: 'achievement',
    category: 'Savings',
    title: 'Savings goal on track!',
    description: 'You\'re on pace to hit your monthly savings target. Keep it up!',
    icon: '🎯',
  },
  {
    id: '5',
    type: 'tip',
    category: 'Utilities',
    title: 'Tip: Bundle your subscriptions',
    description: 'You have 5 separate streaming services. Bundling could save you ₱500/month.',
    amount: 500,
    icon: '💡',
  },
];
