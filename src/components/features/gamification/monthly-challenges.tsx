'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ChallengeProgress {
  current: number;
  target: number;
  unit: string;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'no_spend' | 'savings' | 'budget' | 'habit' | 'custom';
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // days
  startDate: string;
  endDate: string;
  progress: ChallengeProgress;
  reward: string;
  isCompleted: boolean;
  isJoined: boolean;
}

interface MonthlyChallengesProps {
  challenges: Challenge[];
  onJoinChallenge?: (challengeId: string) => void;
  onLeaveChallenge?: (challengeId: string) => void;
  className?: string;
}

const challengeTemplates = [
  {
    name: 'No Spend Week',
    description: 'Avoid unnecessary purchases for 7 days',
    type: 'no_spend',
    icon: '🚫',
    difficulty: 'medium',
    duration: 7,
    reward: '₱500 saved badge',
  },
  {
    name: 'Pack Lunch Challenge',
    description: 'Bring baon to work for 5 days',
    type: 'habit',
    icon: '🍱',
    difficulty: 'easy',
    duration: 5,
    reward: 'Baon Master badge',
  },
  {
    name: '52-Week Savings',
    description: 'Save increasing amounts weekly',
    type: 'savings',
    icon: '📈',
    difficulty: 'hard',
    duration: 365,
    reward: 'Savings Champion trophy',
  },
  {
    name: 'Budget Perfect Month',
    description: 'Stay under budget in all categories',
    type: 'budget',
    icon: '🎯',
    difficulty: 'hard',
    duration: 30,
    reward: 'Budget Ninja badge',
  },
  {
    name: 'Coffee-Free Week',
    description: 'Skip the coffee shop for 7 days',
    type: 'no_spend',
    icon: '☕',
    difficulty: 'easy',
    duration: 7,
    reward: 'Self-Control badge',
  },
  {
    name: 'Side Hustle Sprint',
    description: 'Earn extra income this month',
    type: 'savings',
    icon: '💼',
    difficulty: 'medium',
    duration: 30,
    reward: 'Hustler badge',
  },
];

const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

function ChallengeCard({
  challenge,
  onJoin,
  onLeave,
}: {
  challenge: Challenge;
  onJoin?: () => void;
  onLeave?: () => void;
}) {
  const daysRemaining = Math.ceil(
    (new Date(challenge.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const progressPercent = (challenge.progress.current / challenge.progress.target) * 100;

  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-all',
        challenge.isCompleted
          ? 'bg-green-50 border-green-200'
          : challenge.isJoined
          ? 'bg-blue-50 border-blue-200'
          : 'bg-white border-gray-200 hover:border-blue-300'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
            {challenge.icon}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{challenge.name}</h4>
            <p className="text-sm text-gray-500">{challenge.description}</p>
          </div>
        </div>
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', difficultyColors[challenge.difficulty])}>
          {challenge.difficulty}
        </span>
      </div>

      {/* Progress */}
      {challenge.isJoined && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-gray-900">
              {challenge.progress.current}/{challenge.progress.target} {challenge.progress.unit}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                challenge.isCompleted ? 'bg-green-500' : 'bg-blue-500'
              )}
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span>⏱️</span>
            {challenge.duration} days
          </span>
          {challenge.isJoined && !challenge.isCompleted && daysRemaining > 0 && (
            <span className="flex items-center gap-1">
              <span>📅</span>
              {daysRemaining} left
            </span>
          )}
        </div>

        {challenge.isCompleted ? (
          <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
            <span>✓</span>
            Completed!
          </span>
        ) : challenge.isJoined ? (
          <button
            onClick={onLeave}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Leave
          </button>
        ) : (
          <button
            onClick={onJoin}
            className="px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors"
          >
            Join Challenge
          </button>
        )}
      </div>

      {/* Reward */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>🏆</span>
          Reward: <span className="font-medium text-gray-700">{challenge.reward}</span>
        </p>
      </div>
    </div>
  );
}

export function MonthlyChallenges({
  challenges,
  onJoinChallenge,
  onLeaveChallenge,
  className,
}: MonthlyChallengesProps) {
  const stats = useMemo(() => ({
    active: challenges.filter((c) => c.isJoined && !c.isCompleted).length,
    completed: challenges.filter((c) => c.isCompleted).length,
    available: challenges.filter((c) => !c.isJoined).length,
  }), [challenges]);

  const activeChallenges = challenges.filter((c) => c.isJoined && !c.isCompleted);
  const availableChallenges = challenges.filter((c) => !c.isJoined);
  const completedChallenges = challenges.filter((c) => c.isCompleted);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🎯</span>
          Monthly Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-600">Active</p>
            <p className="text-2xl font-bold text-blue-700">{stats.active}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-600">Completed</p>
            <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600">Available</p>
            <p className="text-2xl font-bold text-gray-700">{stats.available}</p>
          </div>
        </div>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Active Challenges</h4>
            <div className="space-y-3">
              {activeChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onLeave={onLeaveChallenge ? () => onLeaveChallenge(challenge.id) : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {/* Available Challenges */}
        {availableChallenges.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Available Challenges</h4>
            <div className="space-y-3">
              {availableChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onJoin={onJoinChallenge ? () => onJoinChallenge(challenge.id) : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <details className="mb-4">
            <summary className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700">
              View {completedChallenges.length} completed challenges
            </summary>
            <div className="mt-3 space-y-3">
              {completedChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </details>
        )}

        {challenges.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎯</div>
            <p>No challenges available</p>
            <p className="text-sm">Check back soon for new challenges!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { challengeTemplates };
export type { Challenge, ChallengeProgress };
