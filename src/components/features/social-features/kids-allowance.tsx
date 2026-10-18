'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Chore {
  id: string;
  name: string;
  value: number;
  frequency: 'daily' | 'weekly' | 'once';
  completed: boolean;
  completedDate?: string;
}

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  emoji: string;
}

interface Child {
  id: string;
  name: string;
  avatar: string;
  age: number;
  weeklyAllowance: number;
  balance: number;
  savingsRate: number;
  chores: Chore[];
  savingsGoals: SavingsGoal[];
  streak: number;
}

interface KidsAllowanceProps {
  children?: Child[];
  className?: string;
}

const demoChildren: Child[] = [
  {
    id: 'k1',
    name: 'Miguel',
    avatar: '👦',
    age: 10,
    weeklyAllowance: 300,
    balance: 1250,
    savingsRate: 30,
    streak: 5,
    chores: [
      { id: 'c1', name: 'Make bed', value: 10, frequency: 'daily', completed: true, completedDate: '2024-01-15' },
      { id: 'c2', name: 'Do homework', value: 20, frequency: 'daily', completed: true, completedDate: '2024-01-15' },
      { id: 'c3', name: 'Clean room', value: 50, frequency: 'weekly', completed: false },
      { id: 'c4', name: 'Help with dishes', value: 15, frequency: 'daily', completed: true, completedDate: '2024-01-15' },
    ],
    savingsGoals: [
      { id: 'sg1', name: 'Nintendo Switch', targetAmount: 15000, currentAmount: 4500, emoji: '🎮' },
      { id: 'sg2', name: 'School Trip', targetAmount: 2000, currentAmount: 800, emoji: '🎒' },
    ],
  },
  {
    id: 'k2',
    name: 'Sofia',
    avatar: '👧',
    age: 7,
    weeklyAllowance: 200,
    balance: 850,
    savingsRate: 20,
    streak: 3,
    chores: [
      { id: 'c5', name: 'Make bed', value: 10, frequency: 'daily', completed: true, completedDate: '2024-01-15' },
      { id: 'c6', name: 'Feed the dog', value: 15, frequency: 'daily', completed: false },
      { id: 'c7', name: 'Put away toys', value: 10, frequency: 'daily', completed: true, completedDate: '2024-01-15' },
    ],
    savingsGoals: [
      { id: 'sg3', name: 'Barbie House', targetAmount: 3500, currentAmount: 1200, emoji: '🏠' },
    ],
  },
];

export function KidsAllowance({
  children = demoChildren,
  className,
}: KidsAllowanceProps) {
  const totalOwed = useMemo(() => {
    return children.reduce((sum, child) => {
      const completedChores = child.chores
        .filter((c) => c.completed)
        .reduce((s, c) => s + c.value, 0);
      return sum + completedChores;
    }, 0);
  }, [children]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>👶</span>
          Kids Allowance Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Total Balance</p>
            <p className="text-xl font-bold text-blue-700">
              ₱{children.reduce((sum, c) => sum + c.balance, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Weekly Allowances</p>
            <p className="text-xl font-bold text-green-700">
              ₱{children.reduce((sum, c) => sum + c.weeklyAllowance, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-600 mb-1">Chores Owed</p>
            <p className="text-xl font-bold text-orange-700">₱{totalOwed}</p>
          </div>
        </div>

        {/* Children Profiles */}
        <div className="space-y-6">
          {children.map((child) => {
            const completedToday = child.chores.filter((c) => c.completed).length;
            const totalChores = child.chores.length;
            const choreEarnings = child.chores
              .filter((c) => c.completed)
              .reduce((sum, c) => sum + c.value, 0);

            return (
              <div
                key={child.id}
                className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{child.avatar}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{child.name}</p>
                      <p className="text-xs text-gray-500">Age {child.age} • 🔥 {child.streak} day streak</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Balance</p>
                    <p className="text-2xl font-bold text-purple-700">₱{child.balance.toLocaleString()}</p>
                  </div>
                </div>

                {/* Allowance Info */}
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="p-2 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Weekly</p>
                    <p className="font-semibold text-gray-900">₱{child.weeklyAllowance}</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Savings Rate</p>
                    <p className="font-semibold text-green-600">{child.savingsRate}%</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Chore Bonus</p>
                    <p className="font-semibold text-orange-600">₱{choreEarnings}</p>
                  </div>
                </div>

                {/* Chores */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Today&apos;s Chores</p>
                    <p className="text-xs text-gray-500">{completedToday}/{totalChores} done</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {child.chores.map((chore) => (
                      <button
                        key={chore.id}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          chore.completed
                            ? 'bg-green-100 text-green-700 line-through'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-green-400'
                        }`}
                      >
                        {chore.completed ? '✓' : '○'} {chore.name} (+₱{chore.value})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Savings Goals */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Savings Goals</p>
                  <div className="space-y-3">
                    {child.savingsGoals.map((goal) => {
                      const progress = (goal.currentAmount / goal.targetAmount) * 100;
                      const weeksToGo = Math.ceil(
                        (goal.targetAmount - goal.currentAmount) /
                        (child.weeklyAllowance * (child.savingsRate / 100))
                      );

                      return (
                        <div key={goal.id} className="p-3 bg-white rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{goal.emoji}</span>
                              <span className="font-medium text-gray-900">{goal.name}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              ₱{goal.currentAmount.toLocaleString()} / ₱{goal.targetAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {progress >= 100
                              ? '🎉 Goal reached!'
                              : `~${weeksToGo} weeks to go at current savings rate`}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors">
                    + Give Bonus
                  </button>
                  <button className="flex-1 py-2 bg-purple-600 text-white text-sm rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Record Spending
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Child */}
        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-xl text-center">
          <button className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="font-medium">Add Another Child</span>
          </button>
        </div>

        {/* Teaching Tips */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
          <h4 className="font-medium text-yellow-900 mb-2">💡 Teaching Money Skills</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Use the 50/30/20 rule even for kids (needs/wants/savings)</li>
            <li>• Let them make small spending mistakes to learn</li>
            <li>• Match their savings contributions to encourage saving</li>
            <li>• Involve them in family budget discussions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
