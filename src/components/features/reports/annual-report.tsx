'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface YearlyStats {
  totalIncome: number;
  totalExpenses: number;
  totalSaved: number;
  savingsRate: number;
  topExpenseCategory: { name: string; amount: number };
  mostExpensiveMonth: { name: string; amount: number };
  cheapestMonth: { name: string; amount: number };
  transactionCount: number;
  averageDailySpending: number;
}

interface MonthlyBreakdown {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

interface GoalAchievement {
  name: string;
  target: number;
  achieved: number;
  completed: boolean;
}

interface AnnualReportProps {
  year?: number;
  stats?: YearlyStats;
  monthlyBreakdown?: MonthlyBreakdown[];
  goalsAchieved?: GoalAchievement[];
  milestones?: { date: string; title: string; icon: string }[];
  className?: string;
}

const demoStats: YearlyStats = {
  totalIncome: 780000,
  totalExpenses: 546000,
  totalSaved: 234000,
  savingsRate: 30,
  topExpenseCategory: { name: 'Housing', amount: 180000 },
  mostExpensiveMonth: { name: 'December', amount: 68000 },
  cheapestMonth: { name: 'February', amount: 35000 },
  transactionCount: 847,
  averageDailySpending: 1496,
};

const demoMonthlyBreakdown: MonthlyBreakdown[] = [
  { month: 'Jan', income: 65000, expenses: 45000, savings: 20000 },
  { month: 'Feb', income: 65000, expenses: 35000, savings: 30000 },
  { month: 'Mar', income: 65000, expenses: 42000, savings: 23000 },
  { month: 'Apr', income: 65000, expenses: 48000, savings: 17000 },
  { month: 'May', income: 65000, expenses: 44000, savings: 21000 },
  { month: 'Jun', income: 65000, expenses: 46000, savings: 19000 },
  { month: 'Jul', income: 65000, expenses: 43000, savings: 22000 },
  { month: 'Aug', income: 65000, expenses: 47000, savings: 18000 },
  { month: 'Sep', income: 65000, expenses: 41000, savings: 24000 },
  { month: 'Oct', income: 65000, expenses: 45000, savings: 20000 },
  { month: 'Nov', income: 65000, expenses: 42000, savings: 23000 },
  { month: 'Dec', income: 65000, expenses: 68000, savings: -3000 },
];

const demoGoals: GoalAchievement[] = [
  { name: 'Emergency Fund (3 months)', target: 150000, achieved: 150000, completed: true },
  { name: 'Vacation Fund', target: 50000, achieved: 50000, completed: true },
  { name: 'Investment Portfolio', target: 100000, achieved: 75000, completed: false },
  { name: 'Debt Payoff', target: 80000, achieved: 80000, completed: true },
];

const demoMilestones = [
  { date: '2024-02-15', title: 'First ₱100k saved!', icon: '🎉' },
  { date: '2024-05-01', title: 'Paid off credit card', icon: '💳' },
  { date: '2024-07-20', title: 'Started investing', icon: '📈' },
  { date: '2024-10-05', title: 'Emergency fund complete', icon: '🏆' },
  { date: '2024-11-30', title: '6-month expense tracking streak', icon: '🔥' },
];

export function AnnualReport({
  year = 2024,
  stats = demoStats,
  monthlyBreakdown = demoMonthlyBreakdown,
  goalsAchieved = demoGoals,
  milestones = demoMilestones,
  className,
}: AnnualReportProps) {
  const completedGoals = goalsAchieved.filter((g) => g.completed).length;
  const maxExpense = Math.max(...monthlyBreakdown.map((m) => m.expenses));

  const insights = useMemo(() => {
    const avgMonthlyExpense = stats.totalExpenses / 12;
    const consistencyScore = monthlyBreakdown.filter(
      (m) => Math.abs(m.expenses - avgMonthlyExpense) < avgMonthlyExpense * 0.2
    ).length;

    return {
      avgMonthlyExpense,
      consistencyScore,
      savingsConsistency: monthlyBreakdown.filter((m) => m.savings > 0).length,
    };
  }, [stats, monthlyBreakdown]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📅</span>
            {year} Annual Financial Report
          </span>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Download PDF
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Hero Stats */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white">
          <h3 className="text-lg font-medium opacity-90 mb-4">Year in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm opacity-75">Total Income</p>
              <p className="text-2xl font-bold">₱{stats.totalIncome.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Total Expenses</p>
              <p className="text-2xl font-bold">₱{stats.totalExpenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Total Saved</p>
              <p className="text-2xl font-bold text-green-300">₱{stats.totalSaved.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Savings Rate</p>
              <p className="text-2xl font-bold">{stats.savingsRate}%</p>
            </div>
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Monthly Overview</h4>
          <div className="flex items-end justify-between h-40 gap-1">
            {monthlyBreakdown.map((month) => (
              <div key={month.month} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col items-center">
                  <div
                    className="w-full rounded-t bg-red-400"
                    style={{ height: `${(month.expenses / maxExpense) * 100}px` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">{month.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-400 rounded" /> Expenses
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-orange-50 rounded-xl text-center">
            <p className="text-xs text-orange-600 mb-1">Top Category</p>
            <p className="font-bold text-orange-700">{stats.topExpenseCategory.name}</p>
            <p className="text-sm text-orange-600">₱{stats.topExpenseCategory.amount.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl text-center">
            <p className="text-xs text-red-600 mb-1">Most Expensive Month</p>
            <p className="font-bold text-red-700">{stats.mostExpensiveMonth.name}</p>
            <p className="text-sm text-red-600">₱{stats.mostExpensiveMonth.amount.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <p className="text-xs text-green-600 mb-1">Best Month</p>
            <p className="font-bold text-green-700">{stats.cheapestMonth.name}</p>
            <p className="text-sm text-green-600">₱{stats.cheapestMonth.amount.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <p className="text-xs text-blue-600 mb-1">Transactions</p>
            <p className="font-bold text-blue-700">{stats.transactionCount}</p>
            <p className="text-sm text-blue-600">₱{stats.averageDailySpending}/day avg</p>
          </div>
        </div>

        {/* Goals Achieved */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Goals Achieved ({completedGoals}/{goalsAchieved.length})
          </h4>
          <div className="space-y-3">
            {goalsAchieved.map((goal) => (
              <div
                key={goal.name}
                className={`p-3 rounded-xl ${
                  goal.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{goal.completed ? '✅' : '⏳'}</span>
                    <span className="font-medium text-gray-900">{goal.name}</span>
                  </div>
                  <span className={`font-semibold ${goal.completed ? 'text-green-600' : 'text-gray-600'}`}>
                    ₱{goal.achieved.toLocaleString()} / ₱{goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${goal.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min((goal.achieved / goal.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">🏆 Year&apos;s Milestones</h4>
          <div className="space-y-2">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                <span className="text-2xl">{milestone.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{milestone.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(milestone.date).toLocaleDateString('en-PH', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="mb-6 p-4 bg-purple-50 rounded-xl">
          <h4 className="font-medium text-purple-900 mb-3">🔍 Insights</h4>
          <div className="space-y-2 text-sm text-purple-700">
            <p>• You saved money in {insights.savingsConsistency} out of 12 months</p>
            <p>• Your spending was consistent in {insights.consistencyScore} months</p>
            <p>• December was {((stats.mostExpensiveMonth.amount / insights.avgMonthlyExpense - 1) * 100).toFixed(0)}% above your average spending</p>
            <p>• You tracked an average of {Math.round(stats.transactionCount / 12)} transactions per month</p>
          </div>
        </div>

        {/* Next Year Goals */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <h4 className="font-medium text-blue-900 mb-3">🎯 Suggested Goals for {year + 1}</h4>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Increase savings rate to 35%</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Build 6-month emergency fund</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Invest ₱150,000 in diversified portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Track 100% of expenses</span>
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="mt-6 flex justify-center gap-3">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            Share Summary
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
            Print Report
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
