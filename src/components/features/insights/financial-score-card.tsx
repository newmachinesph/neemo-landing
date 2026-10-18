'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ScoreFactor {
  id: string;
  label: string;
  value: number;
  maxValue: number;
  description: string;
  tip: string;
  icon: string;
}

interface FinancialScoreCardProps {
  score: number;
  previousScore?: number;
  factors: ScoreFactor[];
  className?: string;
}

const getGrade = (score: number): { grade: string; label: string; color: string; bgColor: string } => {
  if (score >= 90) return { grade: 'A+', label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score >= 80) return { grade: 'A', label: 'Great', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score >= 70) return { grade: 'B', label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  if (score >= 60) return { grade: 'C', label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  if (score >= 50) return { grade: 'D', label: 'Needs Work', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  return { grade: 'F', label: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
};

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#3B82F6';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
};

export function FinancialScoreCard({
  score,
  previousScore,
  factors,
  className,
}: FinancialScoreCardProps) {
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const gradeInfo = getGrade(score);
  const scoreChange = previousScore !== undefined ? score - previousScore : 0;

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Financial Health Score</span>
          {scoreChange !== 0 && (
            <span
              className={cn(
                'text-sm font-normal flex items-center gap-1',
                scoreChange > 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {scoreChange > 0 ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {Math.abs(scoreChange)} pts
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Score Circle */}
          <div className="flex items-center justify-center gap-8">
            <div className="relative">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  stroke={getScoreColor(score)}
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{score}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            </div>

            <div className="text-center">
              <div
                className={cn(
                  'w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-bold mb-2',
                  gradeInfo.bgColor,
                  gradeInfo.color
                )}
              >
                {gradeInfo.grade}
              </div>
              <p className={cn('font-medium', gradeInfo.color)}>{gradeInfo.label}</p>
            </div>
          </div>

          {/* Factors */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              Score Breakdown
              <span className="text-xs text-gray-400 font-normal">(tap for tips)</span>
            </h4>

            {factors.map((factor) => {
              const percentage = (factor.value / factor.maxValue) * 100;
              const isSelected = selectedFactor === factor.id;

              return (
                <div key={factor.id}>
                  <button
                    onClick={() => setSelectedFactor(isSelected ? null : factor.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <span>{factor.icon}</span>
                        {factor.label}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {factor.value}/{factor.maxValue}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          percentage >= 80
                            ? 'bg-green-500'
                            : percentage >= 60
                            ? 'bg-blue-500'
                            : percentage >= 40
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </button>

                  {isSelected && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100 animate-fadeIn">
                      <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500">💡</span>
                        <p className="text-sm text-blue-700 font-medium">{factor.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Tips */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <span>🚀</span>
              Improve Your Score
            </h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {factors
                .filter((f) => f.value / f.maxValue < 0.7)
                .slice(0, 3)
                .map((factor) => (
                  <li key={factor.id} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    {factor.tip}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Default factors for demo
export const defaultScoreFactors: ScoreFactor[] = [
  {
    id: 'savings',
    label: 'Savings Rate',
    value: 75,
    maxValue: 100,
    description: 'The percentage of your income you save each month.',
    tip: 'Aim to save at least 20% of your monthly income.',
    icon: '💰',
  },
  {
    id: 'debt',
    label: 'Debt-to-Income',
    value: 60,
    maxValue: 100,
    description: 'Your total debt payments relative to your income.',
    tip: 'Keep debt payments under 36% of your income.',
    icon: '💳',
  },
  {
    id: 'emergency',
    label: 'Emergency Fund',
    value: 45,
    maxValue: 100,
    description: 'Months of expenses covered by your emergency savings.',
    tip: 'Build up 3-6 months of expenses in emergency savings.',
    icon: '🛡️',
  },
  {
    id: 'investment',
    label: 'Investment Diversity',
    value: 80,
    maxValue: 100,
    description: 'How diversified your investment portfolio is.',
    tip: 'Diversify across different asset classes to reduce risk.',
    icon: '📈',
  },
  {
    id: 'budget',
    label: 'Budget Adherence',
    value: 70,
    maxValue: 100,
    description: 'How well you stick to your monthly budget.',
    tip: 'Track spending weekly to stay on budget.',
    icon: '📊',
  },
];
