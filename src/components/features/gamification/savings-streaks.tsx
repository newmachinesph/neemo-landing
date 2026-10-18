'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface StreakDay {
  date: string;
  saved: boolean;
  amount?: number;
}

interface SavingsStreaksProps {
  streakDays: StreakDay[];
  currentStreak: number;
  longestStreak: number;
  totalSaved: number;
  currency?: string;
  className?: string;
}

const streakMilestones = [
  { days: 7, badge: '🔥', label: 'Week Warrior', message: 'Isang linggo na!' },
  { days: 14, badge: '⭐', label: 'Two Week Titan', message: 'Dalawang linggo!' },
  { days: 21, badge: '💪', label: 'Habit Former', message: 'Naging habit na!' },
  { days: 30, badge: '🏆', label: 'Monthly Master', message: 'Buong buwan!' },
  { days: 60, badge: '💎', label: 'Diamond Saver', message: 'Dalawang buwan!' },
  { days: 90, badge: '👑', label: 'Legendary', message: 'Tatlong buwan!' },
  { days: 180, badge: '🌟', label: 'Superstar', message: 'Kalahating taon!' },
  { days: 365, badge: '🎖️', label: 'Year Champion', message: 'Isang taon!' },
];

const getStreakBadge = (days: number) => {
  for (let i = streakMilestones.length - 1; i >= 0; i--) {
    if (days >= streakMilestones[i].days) {
      return streakMilestones[i];
    }
  }
  return null;
};

const getNextMilestone = (days: number) => {
  for (const milestone of streakMilestones) {
    if (days < milestone.days) {
      return milestone;
    }
  }
  return null;
};

export function SavingsStreaks({
  streakDays,
  currentStreak,
  longestStreak,
  totalSaved,
  currency = '₱',
  className,
}: SavingsStreaksProps) {
  const currentBadge = getStreakBadge(currentStreak);
  const nextMilestone = getNextMilestone(currentStreak);
  const daysToNext = nextMilestone ? nextMilestone.days - currentStreak : 0;

  // Get last 7 days for display
  const last7Days = useMemo(() => {
    const days: StreakDay[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const existing = streakDays.find((d) => d.date === dateStr);
      days.push(existing || { date: dateStr, saved: false });
    }
    return days;
  }, [streakDays]);

  const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🔥</span>
          Savings Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Streak Display */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white mb-4">
            <div>
              <span className="text-3xl font-bold">{currentStreak}</span>
              <p className="text-xs opacity-80">days</p>
            </div>
          </div>

          {currentBadge && (
            <div className="mb-2">
              <span className="text-4xl">{currentBadge.badge}</span>
              <p className="text-sm font-medium text-gray-700">{currentBadge.label}</p>
              <p className="text-xs text-gray-500">{currentBadge.message}</p>
            </div>
          )}

          {currentStreak === 0 && (
            <p className="text-gray-500">Start saving today to begin your streak!</p>
          )}
        </div>

        {/* Week View */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3 text-center">Last 7 days</p>
          <div className="flex justify-center gap-2">
            {last7Days.map((day, index) => {
              const dayOfWeek = new Date(day.date).getDay();
              const isToday = day.date === new Date().toISOString().split('T')[0];

              return (
                <div key={day.date} className="text-center">
                  <span className="text-xs text-gray-400 block mb-1">
                    {weekdayLabels[dayOfWeek]}
                  </span>
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all',
                      day.saved
                        ? 'bg-green-100 border-2 border-green-500'
                        : isToday
                        ? 'bg-yellow-100 border-2 border-yellow-400'
                        : 'bg-gray-100 border-2 border-gray-200',
                      isToday && 'ring-2 ring-offset-2 ring-yellow-300'
                    )}
                  >
                    {day.saved ? '✓' : isToday ? '?' : '·'}
                  </div>
                  {day.amount && (
                    <span className="text-xs text-green-600 block mt-1">
                      {currency}{day.amount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress to Next Milestone */}
        {nextMilestone && (
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Next milestone</span>
              <span className="text-sm font-medium text-orange-600">
                {nextMilestone.badge} {nextMilestone.label}
              </span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full transition-all"
                style={{ width: `${(currentStreak / nextMilestone.days) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              {daysToNext} more days to go!
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Longest Streak</p>
            <p className="text-2xl font-bold text-blue-700">{longestStreak}</p>
            <p className="text-xs text-blue-500">days</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Total Saved</p>
            <p className="text-xl font-bold text-green-700">
              {currency}{totalSaved.toLocaleString()}
            </p>
            <p className="text-xs text-green-500">via streaks</p>
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 text-center">
            {currentStreak === 0 && '💪 Start now! Every peso counts!'}
            {currentStreak > 0 && currentStreak < 7 && '🌱 Great start! Keep it going!'}
            {currentStreak >= 7 && currentStreak < 30 && '🔥 On fire! Unstoppable!'}
            {currentStreak >= 30 && currentStreak < 90 && '💎 Amazing discipline!'}
            {currentStreak >= 90 && '👑 You\'re a savings legend!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export { streakMilestones, getStreakBadge, getNextMilestone };
export type { StreakDay };
