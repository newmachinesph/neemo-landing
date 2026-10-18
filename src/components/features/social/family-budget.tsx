'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FamilyMember {
  id: string;
  name: string;
  role: 'admin' | 'contributor' | 'viewer';
  avatar?: string;
  monthlyContribution: number;
  totalSpent: number;
}

interface FamilyCategory {
  id: string;
  name: string;
  icon: string;
  budgetAmount: number;
  spentAmount: number;
  assignedTo?: string;
}

interface FamilyBudget {
  id: string;
  name: string;
  month: string;
  totalBudget: number;
  totalSpent: number;
  members: FamilyMember[];
  categories: FamilyCategory[];
}

interface FamilyBudgetProps {
  budget: FamilyBudget;
  currentUserId: string;
  onAddExpense?: (categoryId: string, amount: number, description: string) => void;
  onInviteMember?: () => void;
  currency?: string;
  className?: string;
}

export function FamilyBudgetTracker({
  budget,
  currentUserId,
  onAddExpense,
  onInviteMember,
  currency = '₱',
  className,
}: FamilyBudgetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const currentMember = budget.members.find((m) => m.id === currentUserId);
  const isAdmin = currentMember?.role === 'admin';

  const stats = useMemo(() => {
    const remaining = budget.totalBudget - budget.totalSpent;
    const progressPercent = (budget.totalSpent / budget.totalBudget) * 100;
    const totalContributions = budget.members.reduce((sum, m) => sum + m.monthlyContribution, 0);

    return { remaining, progressPercent, totalContributions };
  }, [budget]);

  const overBudgetCategories = budget.categories.filter(
    (c) => c.spentAmount > c.budgetAmount
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>👨‍👩‍👧‍👦</span>
            {budget.name}
          </span>
          <span className="text-sm font-normal text-gray-500">
            {new Date(budget.month).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Budget Overview */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Family Budget</p>
            <p className="text-4xl font-bold text-gray-900">
              {currency}{budget.totalBudget.toLocaleString()}
            </p>
          </div>

          <div className="w-full h-4 bg-white rounded-full overflow-hidden mb-3">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                stats.progressPercent > 100 ? 'bg-red-500' :
                stats.progressPercent > 80 ? 'bg-yellow-500' : 'bg-green-500'
              )}
              style={{ width: `${Math.min(100, stats.progressPercent)}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-gray-500">Spent</p>
              <p className="font-semibold text-gray-900">
                {currency}{budget.totalSpent.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Remaining</p>
              <p className={cn(
                'font-semibold',
                stats.remaining >= 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {currency}{stats.remaining.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Used</p>
              <p className="font-semibold text-gray-900">
                {stats.progressPercent.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Over Budget Warning */}
        {overBudgetCategories.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <span>⚠️</span>
              <span className="font-medium">Over Budget Warning</span>
            </div>
            <ul className="text-sm text-red-600 space-y-1">
              {overBudgetCategories.map((cat) => (
                <li key={cat.id}>
                  {cat.icon} {cat.name}: {currency}{(cat.spentAmount - cat.budgetAmount).toLocaleString()} over
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Family Members */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Family Members</h4>
            {isAdmin && onInviteMember && (
              <button
                onClick={onInviteMember}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Member
              </button>
            )}
          </div>

          <div className="flex -space-x-2 mb-4">
            {budget.members.map((member) => (
              <div
                key={member.id}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 border-white',
                  member.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                  member.role === 'contributor' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                )}
                title={`${member.name} (${member.role})`}
              >
                {member.avatar || member.name.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {budget.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium',
                    member.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    member.role === 'contributor' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  )}>
                    {member.avatar || member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {member.name}
                      {member.id === currentUserId && (
                        <span className="text-xs text-gray-500 ml-1">(You)</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{member.role}</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-900">
                    Contributes: {currency}{member.monthlyContribution.toLocaleString()}
                  </p>
                  <p className="text-gray-500">
                    Spent: {currency}{member.totalSpent.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Budget Categories</h4>
          <div className="space-y-3">
            {budget.categories.map((category) => {
              const progressPercent = (category.spentAmount / category.budgetAmount) * 100;
              const isOverBudget = progressPercent > 100;

              return (
                <div
                  key={category.id}
                  className={cn(
                    'p-4 rounded-xl border transition-colors cursor-pointer',
                    selectedCategory === category.id
                      ? 'bg-blue-50 border-blue-300'
                      : isOverBudget
                      ? 'bg-red-50 border-red-200'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  )}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium text-gray-900">{category.name}</span>
                      {category.assignedTo && (
                        <span className="text-xs text-gray-500">
                          ({budget.members.find((m) => m.id === category.assignedTo)?.name})
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        'text-sm font-semibold',
                        isOverBudget ? 'text-red-600' : 'text-gray-900'
                      )}>
                        {currency}{category.spentAmount.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {' '}/ {currency}{category.budgetAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        isOverBudget ? 'bg-red-500' :
                        progressPercent > 80 ? 'bg-yellow-500' : 'bg-green-500'
                      )}
                      style={{ width: `${Math.min(100, progressPercent)}%` }}
                    />
                  </div>

                  {/* Add expense button for selected category */}
                  {selectedCategory === category.id && onAddExpense && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddExpense(category.id, 0, '');
                        }}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        + Add Expense
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Tips */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
          <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <span>💡</span>
            Family Budget Tips
          </h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Have weekly budget meetings to review spending</li>
            <li>• Assign categories to specific family members</li>
            <li>• Set aside 10-20% for unexpected expenses</li>
            <li>• Celebrate when you stay under budget!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export type { FamilyBudget, FamilyMember, FamilyCategory };
