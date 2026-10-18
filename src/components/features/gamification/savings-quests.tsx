'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  icon: string;
  reward: {
    type: 'badge' | 'points' | 'cash' | 'unlock';
    value: number | string;
  };
  progress: number;
  target: number;
  unit: string;
  deadline?: string;
  isCompleted: boolean;
  isClaimed: boolean;
}

interface SavingsQuestsProps {
  quests?: Quest[];
  totalPoints?: number;
  currentStreak?: number;
  className?: string;
}

const demoQuests: Quest[] = [
  // Daily Quests
  {
    id: 'q1',
    title: 'No-Spend Day',
    description: 'Go 24 hours without spending any money',
    type: 'daily',
    icon: '🚫',
    reward: { type: 'points', value: 50 },
    progress: 1,
    target: 1,
    unit: 'day',
    isCompleted: true,
    isClaimed: false,
  },
  {
    id: 'q2',
    title: 'Track 3 Expenses',
    description: 'Log at least 3 expenses today',
    type: 'daily',
    icon: '📝',
    reward: { type: 'points', value: 30 },
    progress: 2,
    target: 3,
    unit: 'expenses',
    isCompleted: false,
    isClaimed: false,
  },
  // Weekly Quests
  {
    id: 'q3',
    title: 'Savings Streak',
    description: 'Save money for 7 consecutive days',
    type: 'weekly',
    icon: '🔥',
    reward: { type: 'badge', value: 'Streak Master' },
    progress: 5,
    target: 7,
    unit: 'days',
    deadline: '2024-01-21',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'q4',
    title: 'Under Budget',
    description: 'Stay under budget in all categories this week',
    type: 'weekly',
    icon: '💰',
    reward: { type: 'points', value: 200 },
    progress: 4,
    target: 5,
    unit: 'categories',
    deadline: '2024-01-21',
    isCompleted: false,
    isClaimed: false,
  },
  // Monthly Quests
  {
    id: 'q5',
    title: 'Savings Goal Hero',
    description: 'Reach 100% of any savings goal',
    type: 'monthly',
    icon: '🏆',
    reward: { type: 'badge', value: 'Goal Crusher' },
    progress: 85,
    target: 100,
    unit: '%',
    deadline: '2024-01-31',
    isCompleted: false,
    isClaimed: false,
  },
  {
    id: 'q6',
    title: 'Bill Buster',
    description: 'Negotiate or reduce one bill this month',
    type: 'monthly',
    icon: '📉',
    reward: { type: 'points', value: 500 },
    progress: 0,
    target: 1,
    unit: 'bill',
    deadline: '2024-01-31',
    isCompleted: false,
    isClaimed: false,
  },
  // Special Quests
  {
    id: 'q7',
    title: 'First Emergency Fund',
    description: 'Build your first ₱10,000 emergency fund',
    type: 'special',
    icon: '⭐',
    reward: { type: 'unlock', value: 'Premium Analytics' },
    progress: 7500,
    target: 10000,
    unit: '₱',
    isCompleted: false,
    isClaimed: false,
  },
];

export function SavingsQuests({
  quests = demoQuests,
  totalPoints = 1250,
  currentStreak = 5,
  className,
}: SavingsQuestsProps) {
  const questsByType = useMemo(() => {
    return {
      daily: quests.filter((q) => q.type === 'daily'),
      weekly: quests.filter((q) => q.type === 'weekly'),
      monthly: quests.filter((q) => q.type === 'monthly'),
      special: quests.filter((q) => q.type === 'special'),
    };
  }, [quests]);

  const stats = useMemo(() => {
    const completed = quests.filter((q) => q.isCompleted).length;
    const unclaimed = quests.filter((q) => q.isCompleted && !q.isClaimed).length;
    return { completed, total: quests.length, unclaimed };
  }, [quests]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'weekly': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'monthly': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'special': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const QuestCard = ({ quest }: { quest: Quest }) => {
    const progress = (quest.progress / quest.target) * 100;

    return (
      <div
        className={`p-4 rounded-xl border-2 transition-all ${
          quest.isCompleted
            ? 'border-green-300 bg-green-50'
            : 'border-gray-200 bg-white hover:border-blue-300'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{quest.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{quest.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${getTypeColor(quest.type)}`}>
                  {quest.type}
                </span>
              </div>
              <p className="text-xs text-gray-500">{quest.description}</p>
            </div>
          </div>
          {quest.isCompleted && !quest.isClaimed && (
            <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium hover:bg-green-700 transition-colors animate-pulse">
              Claim!
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{quest.progress} / {quest.target} {quest.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                quest.isCompleted ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Reward & Deadline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <span>🎁</span>
            <span className="text-gray-600">
              {quest.reward.type === 'points'
                ? `+${quest.reward.value} points`
                : quest.reward.type === 'badge'
                ? `🏅 ${quest.reward.value}`
                : quest.reward.type === 'cash'
                ? `₱${quest.reward.value} cashback`
                : `🔓 ${quest.reward.value}`}
            </span>
          </div>
          {quest.deadline && (
            <span className="text-xs text-gray-400">
              Ends {new Date(quest.deadline).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🎯</span>
          Savings Quests
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Total Points</p>
            <p className="text-2xl font-bold text-blue-700">{totalPoints.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-600 mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-orange-700">🔥 {currentStreak}</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Quests Done</p>
            <p className="text-2xl font-bold text-green-700">{stats.completed}/{stats.total}</p>
          </div>
        </div>

        {/* Unclaimed Rewards Alert */}
        {stats.unclaimed > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-300 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="font-semibold text-yellow-900">
                    {stats.unclaimed} reward{stats.unclaimed > 1 ? 's' : ''} waiting!
                  </p>
                  <p className="text-xs text-yellow-700">Claim your rewards below</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                Claim All
              </button>
            </div>
          </div>
        )}

        {/* Daily Quests */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <span>📅</span> Daily Quests
            <span className="text-xs text-gray-400">(Resets at midnight)</span>
          </h4>
          <div className="space-y-3">
            {questsByType.daily.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>

        {/* Weekly Quests */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <span>📆</span> Weekly Quests
          </h4>
          <div className="space-y-3">
            {questsByType.weekly.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>

        {/* Monthly Quests */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <span>🗓️</span> Monthly Quests
          </h4>
          <div className="space-y-3">
            {questsByType.monthly.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>

        {/* Special Quests */}
        {questsByType.special.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <span>⭐</span> Special Quests
            </h4>
            <div className="space-y-3">
              {questsByType.special.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </div>
        )}

        {/* Points Store Teaser */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-purple-900">🛍️ Points Store</h4>
              <p className="text-xs text-purple-700">Redeem points for premium features & rewards</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Browse Store
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
