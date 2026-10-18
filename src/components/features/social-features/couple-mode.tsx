'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Partner {
  id: string;
  name: string;
  avatar: string;
  monthlyIncome: number;
  personalSpending: number;
  contributionToShared: number;
}

interface SharedExpense {
  id: string;
  name: string;
  amount: number;
  splitType: 'equal' | 'proportional' | 'custom';
  paidBy: string;
  category: string;
}

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  contributionSplit: { [partnerId: string]: number };
}

interface CoupleModeProps {
  partners?: Partner[];
  sharedExpenses?: SharedExpense[];
  savingsGoals?: SavingsGoal[];
  defaultSplitType?: 'equal' | 'proportional';
  className?: string;
}

const demoPartners: Partner[] = [
  {
    id: 'p1',
    name: 'You',
    avatar: '👨',
    monthlyIncome: 60000,
    personalSpending: 15000,
    contributionToShared: 30000,
  },
  {
    id: 'p2',
    name: 'Partner',
    avatar: '👩',
    monthlyIncome: 45000,
    personalSpending: 12000,
    contributionToShared: 22500,
  },
];

const demoExpenses: SharedExpense[] = [
  { id: 'e1', name: 'Rent', amount: 25000, splitType: 'proportional', paidBy: 'p1', category: 'Housing' },
  { id: 'e2', name: 'Groceries', amount: 15000, splitType: 'equal', paidBy: 'p2', category: 'Food' },
  { id: 'e3', name: 'Utilities', amount: 8000, splitType: 'proportional', paidBy: 'p1', category: 'Bills' },
  { id: 'e4', name: 'Internet & Netflix', amount: 3500, splitType: 'equal', paidBy: 'p2', category: 'Subscriptions' },
  { id: 'e5', name: 'Date Night Fund', amount: 4000, splitType: 'equal', paidBy: 'p1', category: 'Entertainment' },
];

const demoGoals: SavingsGoal[] = [
  {
    id: 'g1',
    name: 'Wedding Fund',
    targetAmount: 500000,
    currentAmount: 150000,
    contributionSplit: { p1: 60, p2: 40 },
  },
  {
    id: 'g2',
    name: 'Emergency Fund',
    targetAmount: 200000,
    currentAmount: 80000,
    contributionSplit: { p1: 50, p2: 50 },
  },
  {
    id: 'g3',
    name: 'Travel Fund',
    targetAmount: 100000,
    currentAmount: 35000,
    contributionSplit: { p1: 50, p2: 50 },
  },
];

export function CoupleMode({
  partners = demoPartners,
  sharedExpenses = demoExpenses,
  savingsGoals = demoGoals,
  defaultSplitType = 'proportional',
  className,
}: CoupleModeProps) {
  const totalIncome = partners.reduce((sum, p) => sum + p.monthlyIncome, 0);
  const incomeRatios = partners.map((p) => ({
    ...p,
    ratio: (p.monthlyIncome / totalIncome) * 100,
  }));

  const expenseBreakdown = useMemo(() => {
    const totalShared = sharedExpenses.reduce((sum, e) => sum + e.amount, 0);

    const owes: { [key: string]: number } = {};
    partners.forEach((p) => (owes[p.id] = 0));

    sharedExpenses.forEach((expense) => {
      if (expense.splitType === 'equal') {
        const share = expense.amount / partners.length;
        partners.forEach((p) => {
          if (p.id !== expense.paidBy) {
            owes[p.id] += share;
          }
        });
      } else if (expense.splitType === 'proportional') {
        partners.forEach((p) => {
          const ratio = p.monthlyIncome / totalIncome;
          const share = expense.amount * ratio;
          if (p.id !== expense.paidBy) {
            owes[p.id] += share;
          }
        });
      }
    });

    return { totalShared, owes };
  }, [sharedExpenses, partners, totalIncome]);

  const settlementAmount = useMemo(() => {
    // Calculate who owes whom
    const p1Paid = sharedExpenses
      .filter((e) => e.paidBy === 'p1')
      .reduce((sum, e) => sum + e.amount, 0);
    const p2Paid = sharedExpenses
      .filter((e) => e.paidBy === 'p2')
      .reduce((sum, e) => sum + e.amount, 0);

    const p1Share = sharedExpenses.reduce((sum, e) => {
      if (e.splitType === 'equal') return sum + e.amount / 2;
      return sum + e.amount * (partners[0].monthlyIncome / totalIncome);
    }, 0);

    const diff = p1Paid - p1Share;
    return { amount: Math.abs(diff), owes: diff > 0 ? 'p2' : 'p1' };
  }, [sharedExpenses, partners, totalIncome]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💑</span>
          Couple Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Partner Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {incomeRatios.map((partner) => (
            <div
              key={partner.id}
              className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{partner.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-900">{partner.name}</p>
                  <p className="text-xs text-gray-500">
                    {partner.ratio.toFixed(0)}% of household income
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Income</span>
                  <span className="font-medium text-gray-900">₱{partner.monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Personal</span>
                  <span className="font-medium text-gray-900">₱{partner.personalSpending.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To Shared</span>
                  <span className="font-medium text-purple-600">₱{partner.contributionToShared.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Settlement Card */}
        {settlementAmount.amount > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-orange-900">Settlement Needed</p>
                <p className="text-sm text-orange-700">
                  {settlementAmount.owes === 'p1' ? partners[0].name : partners[1].name} owes{' '}
                  {settlementAmount.owes === 'p1' ? partners[1].name : partners[0].name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-700">
                  ₱{settlementAmount.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <button className="mt-1 px-3 py-1 text-xs bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
                  Mark as Settled
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shared Expenses */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Shared Expenses</h4>
            <p className="text-sm font-semibold text-gray-900">
              Total: ₱{expenseBreakdown.totalShared.toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            {sharedExpenses.map((expense) => {
              const payer = partners.find((p) => p.id === expense.paidBy);
              return (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{payer?.avatar}</span>
                    <div>
                      <p className="font-medium text-gray-900">{expense.name}</p>
                      <p className="text-xs text-gray-500">
                        {expense.category} • Split: {expense.splitType}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">₱{expense.amount.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
            + Add Shared Expense
          </button>
        </div>

        {/* Joint Savings Goals */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Joint Savings Goals</h4>
          <div className="space-y-4">
            {savingsGoals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              return (
                <div key={goal.id} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{goal.name}</p>
                    <p className="text-sm text-gray-600">
                      ₱{goal.currentAmount.toLocaleString()} / ₱{goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                    <div className="h-full flex">
                      <div
                        className="bg-pink-400 h-full"
                        style={{ width: `${progress * (goal.contributionSplit.p1 / 100)}%` }}
                      />
                      <div
                        className="bg-purple-400 h-full"
                        style={{ width: `${progress * (goal.contributionSplit.p2 / 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{partners[0].avatar} {goal.contributionSplit.p1}%</span>
                    <span>{progress.toFixed(0)}% complete</span>
                    <span>{partners[1].avatar} {goal.contributionSplit.p2}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Split Type Explanation */}
        <div className="p-4 bg-blue-50 rounded-xl">
          <h4 className="font-medium text-blue-900 mb-2">Split Types Explained</h4>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-start gap-2">
              <span>⚖️</span>
              <div>
                <span className="font-medium">Equal:</span> 50/50 split regardless of income
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>📊</span>
              <div>
                <span className="font-medium">Proportional:</span> Based on income ratio ({incomeRatios[0].ratio.toFixed(0)}/{incomeRatios[1].ratio.toFixed(0)})
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-pink-50 rounded-xl">
          <h4 className="font-medium text-pink-900 mb-2">💕 Couple Finance Tips</h4>
          <ul className="text-sm text-pink-700 space-y-1">
            <li>• Have regular &quot;money dates&quot; to discuss finances</li>
            <li>• Keep some personal spending money for each partner</li>
            <li>• Agree on a spending threshold that requires discussion</li>
            <li>• Celebrate financial wins together!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
