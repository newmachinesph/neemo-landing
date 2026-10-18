'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface YearHighlight {
  icon: string;
  label: string;
  value: string;
  subtext?: string;
}

interface MonthData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

interface YearInReviewData {
  year: number;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  savingsRate: number;
  netWorthChange: number;
  goalsAchieved: number;
  totalGoals: number;
  topCategories: { category: string; icon: string; amount: number }[];
  monthlyData: MonthData[];
  highlights: YearHighlight[];
  funFacts: string[];
}

interface YearInReviewProps {
  data: YearInReviewData;
  onShare?: () => void;
  currency?: string;
  className?: string;
}

export function YearInReview({
  data,
  onShare,
  currency = '₱',
  className,
}: YearInReviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Year Overview
    {
      id: 'overview',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎊</div>
          <h2 className="text-3xl font-bold text-gray-900">Your {data.year} in Review</h2>
          <p className="text-lg text-gray-600">
            Let&apos;s look back at your financial journey!
          </p>
          <div className="py-6">
            <p className="text-sm text-gray-500 mb-2">Total Money Managed</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {currency}{data.totalIncome.toLocaleString()}
            </p>
          </div>
        </div>
      ),
    },
    // Slide 2: Savings Achievement
    {
      id: 'savings',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-2xl font-bold text-gray-900">You Saved</h2>
          <p className="text-5xl font-bold text-green-600">
            {currency}{data.totalSavings.toLocaleString()}
          </p>
          <p className="text-lg text-gray-600">
            That&apos;s {data.savingsRate.toFixed(0)}% of your income!
          </p>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              style={{ width: `${Math.min(100, data.savingsRate)}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {data.savingsRate >= 20 ? '🌟 Above average Filipino savings rate!' : 'Every peso counts!'}
          </p>
        </div>
      ),
    },
    // Slide 3: Goals Achieved
    {
      id: 'goals',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-900">Goals Achieved</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-6xl font-bold text-purple-600">{data.goalsAchieved}</span>
            <span className="text-2xl text-gray-400">/</span>
            <span className="text-3xl text-gray-500">{data.totalGoals}</span>
          </div>
          <p className="text-lg text-gray-600">
            {data.goalsAchieved === data.totalGoals
              ? 'Perfect score! You crushed all your goals! 🏆'
              : data.goalsAchieved > 0
              ? 'Great progress on your financial goals!'
              : 'Set some goals for next year!'}
          </p>
        </div>
      ),
    },
    // Slide 4: Top Spending
    {
      id: 'spending',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900">Where Your Money Went</h2>
          </div>
          <div className="space-y-3">
            {data.topCategories.slice(0, 5).map((cat, index) => (
              <div
                key={cat.category}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : cat.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{cat.category}</p>
                </div>
                <span className="font-bold text-gray-900">
                  {currency}{cat.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 5: Net Worth Change
    {
      id: 'networth',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">📈</div>
          <h2 className="text-2xl font-bold text-gray-900">Net Worth Change</h2>
          <p className={cn(
            'text-5xl font-bold',
            data.netWorthChange >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {data.netWorthChange >= 0 ? '+' : ''}{currency}{data.netWorthChange.toLocaleString()}
          </p>
          <p className="text-lg text-gray-600">
            {data.netWorthChange >= 0
              ? 'Your wealth grew this year! 🚀'
              : 'Building wealth takes time. Keep going! 💪'}
          </p>
        </div>
      ),
    },
    // Slide 6: Fun Facts
    {
      id: 'funfacts',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900">Fun Facts</h2>
          </div>
          <div className="space-y-3">
            {data.funFacts.map((fact, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg text-center"
              >
                <p className="text-gray-700">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 7: Highlights Grid
    {
      id: 'highlights',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold text-gray-900">Year Highlights</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data.highlights.map((highlight, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl text-center"
              >
                <span className="text-3xl mb-2 block">{highlight.icon}</span>
                <p className="text-xs text-gray-500">{highlight.label}</p>
                <p className="text-lg font-bold text-gray-900">{highlight.value}</p>
                {highlight.subtext && (
                  <p className="text-xs text-gray-500">{highlight.subtext}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 8: Thank You
    {
      id: 'thanks',
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🙏</div>
          <h2 className="text-3xl font-bold text-gray-900">Salamat!</h2>
          <p className="text-lg text-gray-600">
            Thank you for trusting Phinance with your financial journey.
          </p>
          <p className="text-lg text-gray-600">
            Here&apos;s to an even better {data.year + 1}! 🎊
          </p>
          {onShare && (
            <Button onClick={onShare} className="mt-6">
              📤 Share Your Year in Review
            </Button>
          )}
        </div>
      ),
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="min-h-[500px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex flex-col">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                currentSlide === index ? 'bg-purple-600 w-6' : 'bg-gray-300'
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-gray-600"
          >
            ← Back
          </Button>
          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            Next →
          </Button>
        </div>
      </div>
    </Card>
  );
}

export type { YearInReviewData, YearHighlight, MonthData };
