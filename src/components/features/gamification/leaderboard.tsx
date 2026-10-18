'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar?: string;
  savingsRate: number;
  streak: number;
  badges: number;
  points: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserEntry?: LeaderboardEntry;
  isOptedIn: boolean;
  onOptInChange?: (optedIn: boolean) => void;
  className?: string;
}

const rankColors: Record<number, string> = {
  1: 'from-yellow-400 to-yellow-600',
  2: 'from-gray-300 to-gray-500',
  3: 'from-orange-400 to-orange-600',
};

const rankIcons: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const isTopThree = entry.rank <= 3;

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl transition-all',
        entry.isCurrentUser
          ? 'bg-blue-50 border-2 border-blue-300'
          : 'bg-gray-50 hover:bg-gray-100'
      )}
    >
      {/* Rank */}
      <div className="w-10 text-center">
        {isTopThree ? (
          <span className="text-2xl">{rankIcons[entry.rank]}</span>
        ) : (
          <span className="text-lg font-bold text-gray-500">#{entry.rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold',
          isTopThree
            ? `bg-gradient-to-br ${rankColors[entry.rank]} text-white`
            : 'bg-gray-200 text-gray-600'
        )}
      >
        {entry.avatar || entry.username.charAt(0).toUpperCase()}
      </div>

      {/* Username & Stats */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{entry.username}</span>
          {entry.isCurrentUser && (
            <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
              You
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span>💰</span>
            {entry.savingsRate}% savings rate
          </span>
          <span className="flex items-center gap-1">
            <span>🔥</span>
            {entry.streak} day streak
          </span>
        </div>
      </div>

      {/* Points */}
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">{entry.points.toLocaleString()}</p>
        <p className="text-xs text-gray-500">points</p>
      </div>
    </div>
  );
}

export function Leaderboard({
  entries,
  currentUserEntry,
  isOptedIn,
  onOptInChange,
  className,
}: LeaderboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<'points' | 'savings' | 'streak'>('points');

  const sortedEntries = [...entries].sort((a, b) => {
    switch (selectedMetric) {
      case 'savings':
        return b.savingsRate - a.savingsRate;
      case 'streak':
        return b.streak - a.streak;
      default:
        return b.points - a.points;
    }
  }).map((entry, index) => ({ ...entry, rank: index + 1 }));

  const topThree = sortedEntries.slice(0, 3);
  const rest = sortedEntries.slice(3, 10);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🏆</span>
            Leaderboard
          </span>
          <span className="text-xs font-normal text-gray-400">Anonymous</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Opt-in toggle */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Participate in Leaderboard</p>
              <p className="text-sm text-gray-500">Compare your progress anonymously</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isOptedIn}
                onChange={(e) => onOptInChange?.(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>

        {!isOptedIn ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🔒</div>
            <p>Opt in to see how you compare</p>
            <p className="text-sm">Your data is always anonymized</p>
          </div>
        ) : (
          <>
            {/* Metric Filter */}
            <div className="flex gap-2 mb-6">
              {(['points', 'savings', 'streak'] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-medium transition-colors',
                    selectedMetric === metric
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {metric === 'points' && '⭐ Points'}
                  {metric === 'savings' && '💰 Savings Rate'}
                  {metric === 'streak' && '🔥 Streak'}
                </button>
              ))}
            </div>

            {/* Top 3 Podium */}
            <div className="flex items-end justify-center gap-4 mb-6 pb-6 border-b border-gray-200">
              {/* 2nd Place */}
              {topThree[1] && (
                <div className="text-center">
                  <div className={cn(
                    'w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br text-white mb-2',
                    rankColors[2]
                  )}>
                    {topThree[1].avatar || topThree[1].username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-2xl">🥈</span>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-20">{topThree[1].username}</p>
                  <p className="text-xs text-gray-500">{topThree[1].points.toLocaleString()} pts</p>
                </div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <div className="text-center -mb-4">
                  <div className={cn(
                    'w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold bg-gradient-to-br text-white mb-2 ring-4 ring-yellow-300',
                    rankColors[1]
                  )}>
                    {topThree[0].avatar || topThree[0].username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-3xl">🥇</span>
                  <p className="text-sm font-bold text-gray-900 truncate max-w-24">{topThree[0].username}</p>
                  <p className="text-xs text-gray-500">{topThree[0].points.toLocaleString()} pts</p>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="text-center">
                  <div className={cn(
                    'w-14 h-14 mx-auto rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br text-white mb-2',
                    rankColors[3]
                  )}>
                    {topThree[2].avatar || topThree[2].username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xl">🥉</span>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-16">{topThree[2].username}</p>
                  <p className="text-xs text-gray-500">{topThree[2].points.toLocaleString()} pts</p>
                </div>
              )}
            </div>

            {/* Rest of Leaderboard */}
            <div className="space-y-2">
              {rest.map((entry) => (
                <LeaderboardRow key={entry.id} entry={entry} />
              ))}
            </div>

            {/* Current User Position (if not in top 10) */}
            {currentUserEntry && currentUserEntry.rank > 10 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Your Position</p>
                <LeaderboardRow entry={currentUserEntry} />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export type { LeaderboardEntry };
