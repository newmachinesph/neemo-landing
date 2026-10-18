'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'savings' | 'budget' | 'goals' | 'streak' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: { current: number; target: number };
}

interface AchievementBadgesProps {
  badges: Badge[];
  totalPoints?: number;
  className?: string;
}

const rarityStyles = {
  common: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-700',
    glow: '',
  },
  rare: {
    bg: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-700',
    glow: 'shadow-blue-200',
  },
  epic: {
    bg: 'bg-purple-100',
    border: 'border-purple-400',
    text: 'text-purple-700',
    glow: 'shadow-purple-200',
  },
  legendary: {
    bg: 'bg-gradient-to-br from-yellow-100 to-orange-100',
    border: 'border-yellow-500',
    text: 'text-yellow-700',
    glow: 'shadow-yellow-300 shadow-lg',
  },
};

const categoryIcons = {
  savings: '💰',
  budget: '📊',
  goals: '🎯',
  streak: '🔥',
  special: '⭐',
};

// Predefined badges
export const badgeDefinitions: Omit<Badge, 'isUnlocked' | 'unlockedAt' | 'progress'>[] = [
  // Savings badges
  { id: 'first_save', name: 'First Step', description: 'Made your first savings deposit', icon: '🌱', category: 'savings', rarity: 'common' },
  { id: 'save_10k', name: 'Ten K Club', description: 'Saved ₱10,000 total', icon: '💵', category: 'savings', rarity: 'common' },
  { id: 'save_50k', name: 'Fifty Grand', description: 'Saved ₱50,000 total', icon: '💰', category: 'savings', rarity: 'rare' },
  { id: 'save_100k', name: 'Six Figures', description: 'Saved ₱100,000 total', icon: '🏦', category: 'savings', rarity: 'epic' },
  { id: 'save_1m', name: 'Millionaire', description: 'Saved ₱1,000,000 total', icon: '👑', category: 'savings', rarity: 'legendary' },

  // Budget badges
  { id: 'first_budget', name: 'Budget Beginner', description: 'Created your first budget', icon: '📝', category: 'budget', rarity: 'common' },
  { id: 'under_budget', name: 'Under Control', description: 'Stayed under budget for a month', icon: '✓', category: 'budget', rarity: 'rare' },
  { id: 'budget_master', name: 'Budget Master', description: 'Stayed under budget for 3 months', icon: '🎓', category: 'budget', rarity: 'epic' },
  { id: 'budget_ninja', name: 'Budget Ninja', description: 'Stayed under budget for 6 months', icon: '🥷', category: 'budget', rarity: 'legendary' },

  // Goal badges
  { id: 'first_goal', name: 'Dream Setter', description: 'Set your first financial goal', icon: '🎯', category: 'goals', rarity: 'common' },
  { id: 'goal_achieved', name: 'Goal Getter', description: 'Achieved your first goal', icon: '🏆', category: 'goals', rarity: 'rare' },
  { id: 'five_goals', name: 'High Achiever', description: 'Achieved 5 financial goals', icon: '🌟', category: 'goals', rarity: 'epic' },
  { id: 'ten_goals', name: 'Dream Achiever', description: 'Achieved 10 financial goals', icon: '💫', category: 'goals', rarity: 'legendary' },

  // Streak badges
  { id: 'streak_7', name: 'Week Warrior', description: '7-day savings streak', icon: '🔥', category: 'streak', rarity: 'common' },
  { id: 'streak_30', name: 'Monthly Momentum', description: '30-day savings streak', icon: '💪', category: 'streak', rarity: 'rare' },
  { id: 'streak_90', name: 'Quarter Master', description: '90-day savings streak', icon: '⚡', category: 'streak', rarity: 'epic' },
  { id: 'streak_365', name: 'Year Legend', description: '365-day savings streak', icon: '🎖️', category: 'streak', rarity: 'legendary' },

  // Special badges
  { id: 'debt_free', name: 'Debt Free', description: 'Paid off all debts', icon: '🆓', category: 'special', rarity: 'legendary' },
  { id: 'emergency_fund', name: 'Prepared', description: 'Built 6-month emergency fund', icon: '🛡️', category: 'special', rarity: 'epic' },
  { id: 'early_bird', name: 'Early Bird', description: 'Logged expenses before 8am', icon: '🐦', category: 'special', rarity: 'common' },
  { id: 'night_owl', name: 'Night Owl', description: 'Logged expenses after 10pm', icon: '🦉', category: 'special', rarity: 'common' },
];

function BadgeCard({ badge }: { badge: Badge }) {
  const rarity = rarityStyles[badge.rarity];
  const progressPercent = badge.progress
    ? (badge.progress.current / badge.progress.target) * 100
    : 0;

  return (
    <div
      className={cn(
        'relative p-4 rounded-xl border-2 transition-all',
        rarity.bg,
        rarity.border,
        badge.isUnlocked ? rarity.glow : 'opacity-50 grayscale',
        badge.isUnlocked && 'hover:scale-105'
      )}
    >
      {/* Rarity indicator */}
      <div className="absolute -top-2 -right-2">
        <span
          className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium',
            rarity.bg,
            rarity.text,
            'border',
            rarity.border
          )}
        >
          {badge.rarity}
        </span>
      </div>

      <div className="text-center">
        <div className={cn(
          'text-4xl mb-2',
          !badge.isUnlocked && 'opacity-30'
        )}>
          {badge.isUnlocked ? badge.icon : '🔒'}
        </div>
        <h4 className={cn('font-semibold text-sm', rarity.text)}>{badge.name}</h4>
        <p className="text-xs text-gray-500 mt-1">{badge.description}</p>

        {/* Progress bar for locked badges */}
        {!badge.isUnlocked && badge.progress && (
          <div className="mt-3">
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {badge.progress.current}/{badge.progress.target}
            </p>
          </div>
        )}

        {badge.isUnlocked && badge.unlockedAt && (
          <p className="text-xs text-gray-400 mt-2">
            Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export function AchievementBadges({ badges, totalPoints = 0, className }: AchievementBadgesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredBadges = selectedCategory === 'all'
    ? badges
    : badges.filter((b) => b.category === selectedCategory);

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const categories = ['all', 'savings', 'budget', 'goals', 'streak', 'special'];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🏅</span>
            Achievement Badges
          </span>
          <span className="text-sm font-normal text-gray-500">
            {unlockedCount}/{badges.length} unlocked
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Points Display */}
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl text-center">
          <p className="text-sm text-gray-600">Total Achievement Points</p>
          <p className="text-3xl font-bold text-yellow-600">{totalPoints.toLocaleString()}</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {category === 'all' ? 'All' : (
                <>
                  {categoryIcons[category as keyof typeof categoryIcons]} {category.charAt(0).toUpperCase() + category.slice(1)}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        {filteredBadges.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🏅</div>
            <p>No badges in this category</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { Badge };
