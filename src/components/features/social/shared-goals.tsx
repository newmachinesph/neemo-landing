'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GoalMember {
  id: string;
  name: string;
  avatar?: string;
  contribution: number;
  lastContributionDate?: string;
}

interface SharedGoal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  targetDate: string;
  createdBy: string;
  members: GoalMember[];
  isOwner: boolean;
}

interface SharedGoalsProps {
  goals: SharedGoal[];
  onContribute?: (goalId: string, amount: number) => void;
  onInvite?: (goalId: string) => void;
  onLeave?: (goalId: string) => void;
  currency?: string;
  className?: string;
}

function SharedGoalCard({
  goal,
  currency = '₱',
  onContribute,
  onInvite,
  onLeave,
}: {
  goal: SharedGoal;
  currency?: string;
  onContribute?: (amount: number) => void;
  onInvite?: () => void;
  onLeave?: () => void;
}) {
  const progressPercent = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const daysRemaining = Math.ceil(
    (new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const topContributors = [...goal.members]
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
              {goal.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{goal.title}</h3>
              {goal.description && (
                <p className="text-sm text-gray-500">{goal.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">👥</span>
            <span className="text-sm font-medium text-gray-700">{goal.members.length}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-900">{progressPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, progressPercent)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-gray-500">
            {currency}{goal.currentAmount.toLocaleString()} raised
          </span>
          <span className="font-medium text-purple-600">
            {currency}{remaining.toLocaleString()} to go
          </span>
        </div>
      </div>

      {/* Members */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Top Contributors</span>
          {onInvite && goal.isOwner && (
            <button
              onClick={onInvite}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + Invite
            </button>
          )}
        </div>
        <div className="space-y-2">
          {topContributors.map((member, index) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-purple-700">
                  {member.avatar || member.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700">{member.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {currency}{member.contribution.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Member Avatars */}
        <div className="flex items-center mt-3">
          <div className="flex -space-x-2">
            {goal.members.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                title={member.name}
              >
                {member.avatar || member.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {goal.members.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                +{goal.members.length - 5}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <span>📅</span>
            {daysRemaining > 0 ? `${daysRemaining} days left` : 'Past deadline'}
          </span>
          <span>Created by {goal.createdBy}</span>
        </div>

        <div className="flex gap-2">
          {onContribute && (
            <Button
              onClick={() => onContribute(0)}
              className="flex-1"
            >
              💰 Contribute
            </Button>
          )}
          {onLeave && !goal.isOwner && (
            <Button
              variant="outline"
              onClick={onLeave}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Leave
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function SharedGoals({
  goals,
  onContribute,
  onInvite,
  onLeave,
  currency = '₱',
  className,
}: SharedGoalsProps) {
  const stats = useMemo(() => ({
    totalContributed: goals.reduce((sum, g) => sum + g.currentAmount, 0),
    activeGoals: goals.filter((g) => new Date(g.targetDate) >= new Date()).length,
    completedGoals: goals.filter((g) => g.currentAmount >= g.targetAmount).length,
  }), [goals]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>👥</span>
          Shared Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <p className="text-xs text-purple-600">Total Contributed</p>
            <p className="text-lg font-bold text-purple-700">
              {currency}{stats.totalContributed.toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-600">Active</p>
            <p className="text-xl font-bold text-blue-700">{stats.activeGoals}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-600">Completed</p>
            <p className="text-xl font-bold text-green-700">{stats.completedGoals}</p>
          </div>
        </div>

        {/* Goals */}
        {goals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">👥</div>
            <p>No shared goals yet</p>
            <p className="text-sm">Save together with family and friends!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <SharedGoalCard
                key={goal.id}
                goal={goal}
                currency={currency}
                onContribute={onContribute ? (amount) => onContribute(goal.id, amount) : undefined}
                onInvite={onInvite ? () => onInvite(goal.id) : undefined}
                onLeave={onLeave ? () => onLeave(goal.id) : undefined}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { SharedGoal, GoalMember };
