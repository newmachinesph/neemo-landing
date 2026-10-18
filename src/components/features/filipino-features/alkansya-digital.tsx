'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SavingsJar {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
  contributions: { date: string; amount: number; note?: string }[];
  targetDate?: string;
}

interface AlkansyaDigitalProps {
  savingsJars?: SavingsJar[];
  dailySavingsGoal?: number;
  className?: string;
}

const demoSavingsJars: SavingsJar[] = [
  {
    id: 'j1',
    name: 'Emergency Fund',
    emoji: '🏥',
    targetAmount: 100000,
    currentAmount: 45000,
    color: '#EF4444',
    targetDate: '2024-12-31',
    contributions: [
      { date: '2024-01-15', amount: 5000, note: 'Salary' },
      { date: '2024-01-10', amount: 2000 },
      { date: '2024-01-05', amount: 3000, note: 'Bonus' },
    ],
  },
  {
    id: 'j2',
    name: 'Vacation Fund',
    emoji: '✈️',
    targetAmount: 50000,
    currentAmount: 22500,
    color: '#3B82F6',
    targetDate: '2024-06-01',
    contributions: [
      { date: '2024-01-14', amount: 2500 },
      { date: '2024-01-07', amount: 2000 },
    ],
  },
  {
    id: 'j3',
    name: 'Gadget Fund',
    emoji: '📱',
    targetAmount: 80000,
    currentAmount: 35000,
    color: '#8B5CF6',
    targetDate: '2024-08-15',
    contributions: [
      { date: '2024-01-12', amount: 5000 },
      { date: '2024-01-01', amount: 10000, note: 'Christmas bonus' },
    ],
  },
  {
    id: 'j4',
    name: 'House Fund',
    emoji: '🏠',
    targetAmount: 500000,
    currentAmount: 125000,
    color: '#10B981',
    contributions: [
      { date: '2024-01-15', amount: 15000 },
      { date: '2024-01-01', amount: 10000 },
    ],
  },
];

const savingsChallenges = [
  { name: '52-Week Challenge', description: 'Save ₱1 week 1, ₱2 week 2... ₱52 by week 52', total: 1378 },
  { name: 'No-Spend Weekend', description: 'Skip spending every weekend, save the difference', total: 'Varies' },
  { name: '₱20 Daily', description: 'Save just ₱20 every day for a year', total: 7300 },
  { name: 'Round-Up Savings', description: 'Round up every purchase, save the difference', total: 'Varies' },
];

export function AlkansyaDigital({
  savingsJars = demoSavingsJars,
  dailySavingsGoal = 200,
  className,
}: AlkansyaDigitalProps) {
  const totalSavings = useMemo(() => {
    return savingsJars.reduce((sum, jar) => sum + jar.currentAmount, 0);
  }, [savingsJars]);

  const totalTarget = useMemo(() => {
    return savingsJars.reduce((sum, jar) => sum + jar.targetAmount, 0);
  }, [savingsJars]);

  const thisMonthSavings = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return savingsJars.reduce((sum, jar) => {
      const monthContributions = jar.contributions
        .filter((c) => c.date.startsWith(currentMonth))
        .reduce((s, c) => s + c.amount, 0);
      return sum + monthContributions;
    }, 0);
  }, [savingsJars]);

  const streakDays = 15; // Demo value

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🐷</span>
          Alkansya Digital
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-600 mb-1">Total Savings</p>
            <p className="text-xl font-bold text-orange-700">₱{totalSavings.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">This Month</p>
            <p className="text-xl font-bold text-green-700">₱{thisMonthSavings.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Daily Goal</p>
            <p className="text-xl font-bold text-blue-700">₱{dailySavingsGoal}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Streak</p>
            <p className="text-xl font-bold text-purple-700">🔥 {streakDays} days</p>
          </div>
        </div>

        {/* Savings Jars */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">My Alkansya Jars</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savingsJars.map((jar) => {
              const progress = (jar.currentAmount / jar.targetAmount) * 100;
              const remaining = jar.targetAmount - jar.currentAmount;
              const daysUntilTarget = jar.targetDate
                ? Math.ceil((new Date(jar.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                : null;
              const dailyNeeded = daysUntilTarget ? remaining / daysUntilTarget : null;

              return (
                <div
                  key={jar.id}
                  className="p-4 rounded-xl border-2"
                  style={{ borderColor: jar.color + '40', backgroundColor: jar.color + '10' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{jar.emoji}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{jar.name}</p>
                        <p className="text-xs text-gray-500">
                          {jar.targetDate && `Target: ${new Date(jar.targetDate).toLocaleDateString('en-PH', { month: 'short', year: 'numeric' })}`}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-lg font-bold"
                      style={{ color: jar.color }}
                    >
                      {progress.toFixed(0)}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: jar.color }}
                    />
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-600">₱{jar.currentAmount.toLocaleString()}</span>
                    <span className="text-gray-900 font-medium">₱{jar.targetAmount.toLocaleString()}</span>
                  </div>

                  {dailyNeeded && dailyNeeded > 0 && (
                    <p className="text-xs text-gray-500">
                      Save ₱{Math.ceil(dailyNeeded).toLocaleString()}/day to reach goal in {daysUntilTarget} days
                    </p>
                  )}

                  <button
                    className="w-full mt-3 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: jar.color, color: 'white' }}
                  >
                    + Add to Jar
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add New Jar */}
        <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-xl text-center">
          <button className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="font-medium">Create New Alkansya</span>
          </button>
        </div>

        {/* Savings Challenges */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Savings Challenges</h4>
          <div className="grid grid-cols-2 gap-3">
            {savingsChallenges.map((challenge) => (
              <div
                key={challenge.name}
                className="p-3 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200"
              >
                <p className="font-medium text-gray-900 text-sm">{challenge.name}</p>
                <p className="text-xs text-gray-600 mb-2">{challenge.description}</p>
                <p className="text-xs font-medium text-amber-700">
                  Potential: ₱{typeof challenge.total === 'number' ? challenge.total.toLocaleString() : challenge.total}/year
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {savingsJars
              .flatMap((jar) =>
                jar.contributions.map((c) => ({
                  ...c,
                  jarName: jar.name,
                  jarEmoji: jar.emoji,
                  jarColor: jar.color,
                }))
              )
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{activity.jarEmoji}</span>
                    <div>
                      <p className="font-medium text-gray-900">{activity.jarName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                        {activity.note && ` • ${activity.note}`}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">
                    +₱{activity.amount.toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl text-center">
          <p className="text-lg mb-1">💪</p>
          <p className="text-sm font-medium text-gray-900">
            &quot;Money saved is never wasted!&quot;
          </p>
          <p className="text-xs text-gray-500 mt-1">Keep saving, you&apos;re doing great!</p>
        </div>
      </CardContent>
    </Card>
  );
}
