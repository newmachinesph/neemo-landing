'use client';

import { Card, CardHeader, CardTitle, CardContent, Progress } from '@/components/ui';
import { FinancialScore as FinancialScoreType } from '@/types';

interface FinancialScoreProps {
  score: FinancialScoreType;
}

export function FinancialScore({ score }: FinancialScoreProps) {
  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      A: 'text-green-600 bg-green-100',
      B: 'text-blue-600 bg-blue-100',
      C: 'text-yellow-600 bg-yellow-100',
      D: 'text-orange-600 bg-orange-100',
      F: 'text-red-600 bg-red-100',
    };
    return colors[grade] || 'text-gray-600 bg-gray-100';
  };

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const factors = [
    { label: 'Savings Rate', value: score.factors.savingsRate, description: 'How much you save monthly' },
    { label: 'Debt-to-Income', value: score.factors.debtToIncome, description: 'Your debt burden' },
    { label: 'Emergency Fund', value: score.factors.emergencyFund, description: 'Months of expenses saved' },
    { label: 'Investment Diversity', value: score.factors.investmentDiversity, description: 'Portfolio diversification' },
    { label: 'Budget Adherence', value: score.factors.budgetAdherence, description: 'Staying within budget' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Health Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Score display */}
          <div className="flex items-center justify-center gap-6">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={score.score >= 70 ? '#10B981' : score.score >= 50 ? '#3B82F6' : '#EF4444'}
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(score.score / 100) * 352} 352`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{score.score}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            </div>
            <div className="text-center">
              <span className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-3xl font-bold ${getGradeColor(score.grade)}`}>
                {score.grade}
              </span>
              <p className="mt-2 text-sm text-gray-500">Your Grade</p>
            </div>
          </div>

          {/* Factors breakdown */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900">Score Breakdown</h4>
            {factors.map((factor) => (
              <div key={factor.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{factor.label}</span>
                  <span className="text-sm font-medium text-gray-900">{factor.value}/100</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getScoreColor(factor.value)}`}
                    style={{ width: `${factor.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
