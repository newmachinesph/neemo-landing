'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Milestone {
  id: string;
  amount: number;
  label: string;
  icon: string;
  message: string;
  celebrationMessage: string;
  isReached: boolean;
  reachedAt?: string;
}

interface FinancialMilestonesProps {
  currentNetWorth: number;
  milestones: Milestone[];
  currency?: string;
  className?: string;
  onCelebrate?: (milestone: Milestone) => void;
}

// Default milestones in PHP
export const defaultMilestones: Omit<Milestone, 'isReached' | 'reachedAt'>[] = [
  {
    id: '10k',
    amount: 10000,
    label: 'First ₱10K',
    icon: '🌱',
    message: 'Your savings journey begins!',
    celebrationMessage: 'Congrats on your first ₱10,000! Simula pa lang \'to!',
  },
  {
    id: '50k',
    amount: 50000,
    label: '₱50K Club',
    icon: '💪',
    message: 'Building momentum!',
    celebrationMessage: 'Half way to ₱100K! Ang galing mo!',
  },
  {
    id: '100k',
    amount: 100000,
    label: '₱100K Club',
    icon: '🎯',
    message: 'Six figures achieved!',
    celebrationMessage: 'Naabot mo na ang ₱100,000! Keep it up!',
  },
  {
    id: '250k',
    amount: 250000,
    label: 'Quarter Million',
    icon: '💎',
    message: 'Serious saver status!',
    celebrationMessage: 'Quarter million pesos! Ikaw na ang pinaka-kuripot!',
  },
  {
    id: '500k',
    amount: 500000,
    label: 'Half Million',
    icon: '🏆',
    message: 'Halfway to a millionaire!',
    celebrationMessage: 'Kalahating milyon na! Millionaire ka na soon!',
  },
  {
    id: '1m',
    amount: 1000000,
    label: 'Millionaire',
    icon: '👑',
    message: 'You made it to 7 figures!',
    celebrationMessage: '🎉 MILLIONAIRE KA NA! Congratulations!!!',
  },
  {
    id: '2m',
    amount: 2000000,
    label: 'Double Millionaire',
    icon: '💰',
    message: 'Wealth is compounding!',
    celebrationMessage: 'Dalawang milyon! Ang yaman mo na!',
  },
  {
    id: '5m',
    amount: 5000000,
    label: '₱5M Net Worth',
    icon: '🌟',
    message: 'Financial freedom approaching!',
    celebrationMessage: 'Limang milyon! Legend ka na talaga!',
  },
  {
    id: '10m',
    amount: 10000000,
    label: '₱10M Net Worth',
    icon: '🎖️',
    message: 'Truly wealthy!',
    celebrationMessage: 'Sampung milyon! Hall of Fame material!',
  },
];

function MilestoneCard({
  milestone,
  currentAmount,
  currency = '₱',
  isNext,
  onCelebrate,
}: {
  milestone: Milestone;
  currentAmount: number;
  currency?: string;
  isNext: boolean;
  onCelebrate?: () => void;
}) {
  const progressPercent = Math.min(100, (currentAmount / milestone.amount) * 100);
  const amountNeeded = Math.max(0, milestone.amount - currentAmount);

  return (
    <div
      className={cn(
        'relative p-4 rounded-xl border-2 transition-all',
        milestone.isReached
          ? 'bg-green-50 border-green-300'
          : isNext
          ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200 ring-offset-2'
          : 'bg-gray-50 border-gray-200 opacity-60'
      )}
    >
      {/* Status badge */}
      {milestone.isReached && (
        <div className="absolute -top-2 -right-2">
          <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full">
            ✓ Reached
          </span>
        </div>
      )}
      {isNext && !milestone.isReached && (
        <div className="absolute -top-2 -right-2">
          <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full animate-pulse">
            Next Goal
          </span>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div
          className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center text-3xl',
            milestone.isReached ? 'bg-green-100' : 'bg-white border border-gray-200'
          )}
        >
          {milestone.icon}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{milestone.label}</h4>
          <p className="text-lg font-bold text-gray-700">
            {currency}{milestone.amount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">{milestone.message}</p>
        </div>
      </div>

      {/* Progress bar for unreached milestones */}
      {!milestone.isReached && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-gray-700">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                isNext ? 'bg-blue-500' : 'bg-gray-400'
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {currency}{amountNeeded.toLocaleString()} more to go
          </p>
        </div>
      )}

      {/* Reached date */}
      {milestone.isReached && milestone.reachedAt && (
        <div className="mt-3 pt-3 border-t border-green-200">
          <p className="text-xs text-green-600 flex items-center gap-1">
            <span>📅</span>
            Reached on {new Date(milestone.reachedAt).toLocaleDateString('en-PH', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export function FinancialMilestones({
  currentNetWorth,
  milestones,
  currency = '₱',
  className,
  onCelebrate,
}: FinancialMilestonesProps) {
  const nextMilestoneIndex = useMemo(() => {
    return milestones.findIndex((m) => !m.isReached);
  }, [milestones]);

  const reachedCount = milestones.filter((m) => m.isReached).length;
  const nextMilestone = milestones[nextMilestoneIndex];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏔️</span>
          Financial Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Net Worth */}
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl text-center">
          <p className="text-sm text-gray-600 mb-1">Current Net Worth</p>
          <p className="text-4xl font-bold text-gray-900">
            {currency}{currentNetWorth.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {reachedCount} of {milestones.length} milestones reached
          </p>
        </div>

        {/* Progress to Next Milestone */}
        {nextMilestone && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">Next Milestone</span>
              <span className="text-lg font-bold text-blue-700">
                {nextMilestone.icon} {nextMilestone.label}
              </span>
            </div>
            <div className="w-full h-3 bg-white rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(currentNetWorth / nextMilestone.amount) * 100}%` }}
              />
            </div>
            <p className="text-sm text-blue-600 text-center">
              {currency}{(nextMilestone.amount - currentNetWorth).toLocaleString()} more to reach {nextMilestone.label}
            </p>
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              currentAmount={currentNetWorth}
              currency={currency}
              isNext={index === nextMilestoneIndex}
              onCelebrate={onCelebrate ? () => onCelebrate(milestone) : undefined}
            />
          ))}
        </div>

        {/* All milestones reached */}
        {nextMilestoneIndex === -1 && (
          <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl text-center">
            <div className="text-5xl mb-3">🎊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              All Milestones Reached!
            </h3>
            <p className="text-gray-600">
              You&apos;ve achieved all financial milestones. You&apos;re truly wealthy!
              Keep growing your wealth!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { Milestone };
