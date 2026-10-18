'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface HealthCategory {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  icon: string;
  status: 'excellent' | 'good' | 'fair' | 'needs_work' | 'critical';
  tips: string[];
  metrics: { label: string; value: string; isGood: boolean }[];
}

interface FinancialHealthScoreProps {
  categories?: HealthCategory[];
  previousScore?: number;
  className?: string;
}

const demoCategories: HealthCategory[] = [
  {
    id: 'savings',
    name: 'Savings',
    score: 75,
    maxScore: 100,
    weight: 25,
    icon: '🐷',
    status: 'good',
    tips: [
      'Aim for 20% savings rate',
      'Build 3-6 months emergency fund',
      'Automate your savings',
    ],
    metrics: [
      { label: 'Savings Rate', value: '18%', isGood: true },
      { label: 'Emergency Fund', value: '2.5 months', isGood: false },
      { label: 'Monthly Savings', value: '₱15,000', isGood: true },
    ],
  },
  {
    id: 'spending',
    name: 'Spending Habits',
    score: 82,
    maxScore: 100,
    weight: 20,
    icon: '💳',
    status: 'good',
    tips: [
      'Track all expenses consistently',
      'Review subscriptions regularly',
      'Use the 24-hour rule for big purchases',
    ],
    metrics: [
      { label: 'Under Budget', value: '4/5 categories', isGood: true },
      { label: 'Impulse Spending', value: 'Low', isGood: true },
      { label: 'Tracking Consistency', value: '85%', isGood: true },
    ],
  },
  {
    id: 'debt',
    name: 'Debt Management',
    score: 60,
    maxScore: 100,
    weight: 25,
    icon: '🏦',
    status: 'fair',
    tips: [
      'Pay more than minimum on credit cards',
      'Consider debt consolidation',
      'Avoid taking on new debt',
    ],
    metrics: [
      { label: 'Debt-to-Income', value: '28%', isGood: false },
      { label: 'Credit Utilization', value: '35%', isGood: false },
      { label: 'Payment History', value: 'On time', isGood: true },
    ],
  },
  {
    id: 'investments',
    name: 'Investments',
    score: 45,
    maxScore: 100,
    weight: 15,
    icon: '📈',
    status: 'needs_work',
    tips: [
      'Start investing even small amounts',
      'Diversify your portfolio',
      'Consider index funds for beginners',
    ],
    metrics: [
      { label: 'Investment Rate', value: '5%', isGood: false },
      { label: 'Diversification', value: 'Low', isGood: false },
      { label: 'Retirement Savings', value: 'Started', isGood: true },
    ],
  },
  {
    id: 'protection',
    name: 'Financial Protection',
    score: 70,
    maxScore: 100,
    weight: 15,
    icon: '🛡️',
    status: 'good',
    tips: [
      'Review insurance coverage annually',
      'Create or update your will',
      'Set up beneficiaries for all accounts',
    ],
    metrics: [
      { label: 'Life Insurance', value: '₱1M', isGood: true },
      { label: 'Health Insurance', value: 'HMO + PhilHealth', isGood: true },
      { label: 'Emergency Contacts', value: 'Set up', isGood: true },
    ],
  },
];

export function FinancialHealthScore({
  categories = demoCategories,
  previousScore = 65,
  className,
}: FinancialHealthScoreProps) {
  const overallScore = useMemo(() => {
    const weightedSum = categories.reduce(
      (sum, cat) => sum + (cat.score * cat.weight) / 100,
      0
    );
    return Math.round(weightedSum);
  }, [categories]);

  const scoreDiff = overallScore - previousScore;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-blue-400 to-indigo-500';
    if (score >= 40) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'fair': return 'bg-yellow-100 text-yellow-700';
      case 'needs_work': return 'bg-orange-100 text-orange-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>❤️</span>
          Financial Health Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Main Score Display */}
        <div className="mb-8">
          <div className="relative w-48 h-48 mx-auto">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(overallScore / 100) * 283} 283`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={`stop-color-${getScoreBackground(overallScore).split(' ')[0]}`} stopColor={overallScore >= 80 ? '#22c55e' : overallScore >= 60 ? '#3b82f6' : overallScore >= 40 ? '#eab308' : '#ef4444'} />
                  <stop offset="100%" className={`stop-color-${getScoreBackground(overallScore).split(' ')[1]}`} stopColor={overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#6366f1' : overallScore >= 40 ? '#f97316' : '#f43f5e'} />
                </linearGradient>
              </defs>
            </svg>
            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </span>
              <span className="text-gray-500 text-sm">out of 100</span>
              <span className={`text-2xl font-bold mt-1 ${getScoreColor(overallScore)}`}>
                {getGrade(overallScore)}
              </span>
            </div>
          </div>

          {/* Score Change */}
          <div className="text-center mt-4">
            <span className={`text-sm font-medium ${scoreDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {scoreDiff >= 0 ? '↑' : '↓'} {Math.abs(scoreDiff)} points from last month
            </span>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Score Breakdown</h4>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(category.status)}`}>
                      {category.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className={`font-bold ${getScoreColor(category.score)}`}>
                    {category.score}/100
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${getScoreBackground(category.score)}`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {category.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-2 bg-white rounded-lg">
                      <p className="text-xs text-gray-500">{metric.label}</p>
                      <p className={`text-sm font-medium ${metric.isGood ? 'text-green-600' : 'text-orange-600'}`}>
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Top Tip */}
                <div className="text-xs text-gray-600 bg-white p-2 rounded-lg">
                  💡 {category.tips[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
          <h4 className="font-medium text-purple-900 mb-3">🎯 Top 3 Ways to Improve</h4>
          <div className="space-y-2">
            {categories
              .sort((a, b) => a.score - b.score)
              .slice(0, 3)
              .map((cat, i) => (
                <div key={cat.id} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                    <p className="text-xs text-gray-500">{cat.tips[0]}</p>
                  </div>
                  <span className="text-xs text-purple-600">+{Math.min(15, 100 - cat.score)} pts</span>
                </div>
              ))}
          </div>
        </div>

        {/* Score History Mini Chart */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-medium text-gray-700 mb-3">Score History</h4>
          <div className="flex items-end justify-between h-20 gap-1">
            {[58, 62, 60, 65, 68, overallScore].map((score, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`w-full rounded-t-sm bg-gradient-to-t ${getScoreBackground(score)}`}
                  style={{ height: `${(score / 100) * 60}px` }}
                />
                <span className="text-xs text-gray-500 mt-1">
                  {i === 5 ? 'Now' : `${6 - i}mo`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Share Score */}
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all">
            Share My Score
          </button>
          <p className="text-xs text-gray-500 mt-2">Compare with friends & family</p>
        </div>
      </CardContent>
    </Card>
  );
}
