'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CityLivingCost {
  city: string;
  region: string;
  averageRent: number;
  utilities: number;
  food: number;
  transportation: number;
  healthcare: number;
  misc: number;
}

interface EmergencyFundCalculatorProps {
  currentSavings?: number;
  monthlyIncome?: number;
  currency?: string;
  className?: string;
}

// Average living costs by Philippine city (monthly, single person)
const cityData: CityLivingCost[] = [
  { city: 'Metro Manila (Makati/BGC)', region: 'NCR', averageRent: 20000, utilities: 3500, food: 8000, transportation: 3000, healthcare: 1500, misc: 3000 },
  { city: 'Metro Manila (QC/Pasig)', region: 'NCR', averageRent: 12000, utilities: 3000, food: 7000, transportation: 2500, healthcare: 1500, misc: 2500 },
  { city: 'Metro Manila (Budget Areas)', region: 'NCR', averageRent: 7000, utilities: 2500, food: 6000, transportation: 2000, healthcare: 1000, misc: 2000 },
  { city: 'Cebu City', region: 'Visayas', averageRent: 10000, utilities: 2500, food: 6000, transportation: 2000, healthcare: 1200, misc: 2000 },
  { city: 'Davao City', region: 'Mindanao', averageRent: 8000, utilities: 2000, food: 5500, transportation: 1800, healthcare: 1000, misc: 1800 },
  { city: 'Baguio City', region: 'CAR', averageRent: 8000, utilities: 2000, food: 5500, transportation: 1500, healthcare: 1000, misc: 1800 },
  { city: 'Iloilo City', region: 'Visayas', averageRent: 7000, utilities: 2000, food: 5000, transportation: 1500, healthcare: 1000, misc: 1500 },
  { city: 'Provincial (Average)', region: 'Province', averageRent: 5000, utilities: 1500, food: 4500, transportation: 1200, healthcare: 800, misc: 1200 },
];

const targetMonths = [3, 6, 9, 12];

export function EmergencyFundCalculator({
  currentSavings = 0,
  monthlyIncome = 0,
  currency = '₱',
  className,
}: EmergencyFundCalculatorProps) {
  const [selectedCity, setSelectedCity] = useState(cityData[0]);
  const [targetMonthsCount, setTargetMonthsCount] = useState(6);
  const [customExpenses, setCustomExpenses] = useState<Record<string, number>>({});
  const [useCustom, setUseCustom] = useState(false);

  const expenses = useMemo(() => {
    if (useCustom) {
      return {
        averageRent: customExpenses.rent || selectedCity.averageRent,
        utilities: customExpenses.utilities || selectedCity.utilities,
        food: customExpenses.food || selectedCity.food,
        transportation: customExpenses.transportation || selectedCity.transportation,
        healthcare: customExpenses.healthcare || selectedCity.healthcare,
        misc: customExpenses.misc || selectedCity.misc,
      };
    }
    return selectedCity;
  }, [selectedCity, customExpenses, useCustom]);

  const monthlyTotal = Object.values(expenses).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0)
    - (typeof expenses.averageRent === 'number' ? 0 : 0); // Adjust if needed

  const actualMonthly = expenses.averageRent + expenses.utilities + expenses.food +
    expenses.transportation + expenses.healthcare + expenses.misc;

  const targetAmount = actualMonthly * targetMonthsCount;
  const progressPercent = Math.min(100, (currentSavings / targetAmount) * 100);
  const amountNeeded = Math.max(0, targetAmount - currentSavings);
  const monthsToGoal = monthlyIncome > 0
    ? Math.ceil(amountNeeded / (monthlyIncome * 0.2)) // Assuming 20% savings rate
    : 0;

  const expenseCategories = [
    { key: 'averageRent', label: 'Rent/Housing', icon: '🏠', value: expenses.averageRent },
    { key: 'utilities', label: 'Utilities', icon: '💡', value: expenses.utilities },
    { key: 'food', label: 'Food & Groceries', icon: '🛒', value: expenses.food },
    { key: 'transportation', label: 'Transportation', icon: '🚌', value: expenses.transportation },
    { key: 'healthcare', label: 'Healthcare', icon: '🏥', value: expenses.healthcare },
    { key: 'misc', label: 'Miscellaneous', icon: '📦', value: expenses.misc },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🛡️</span>
          Emergency Fund Calculator
          <span className="text-sm font-normal text-gray-500">(PH Cost of Living)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* City Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Location
          </label>
          <select
            value={selectedCity.city}
            onChange={(e) => setSelectedCity(cityData.find((c) => c.city === e.target.value) || cityData[0])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {cityData.map((city) => (
              <option key={city.city} value={city.city}>
                {city.city} ({city.region})
              </option>
            ))}
          </select>
        </div>

        {/* Target Months */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Emergency Fund (months of expenses)
          </label>
          <div className="flex gap-2">
            {targetMonths.map((months) => (
              <button
                key={months}
                onClick={() => setTargetMonthsCount(months)}
                className={cn(
                  'flex-1 py-3 rounded-lg text-sm font-medium transition-colors',
                  targetMonthsCount === months
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {months} months
              </button>
            ))}
          </div>
        </div>

        {/* Monthly Expenses Breakdown */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Monthly Expenses Estimate</h4>
            <label className="flex items-center gap-2 text-sm text-gray-500">
              <input
                type="checkbox"
                checked={useCustom}
                onChange={(e) => setUseCustom(e.target.checked)}
                className="rounded border-gray-300"
              />
              Customize
            </label>
          </div>

          <div className="space-y-3">
            {expenseCategories.map((cat) => (
              <div key={cat.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span className="text-sm text-gray-600">{cat.label}</span>
                </div>
                {useCustom ? (
                  <input
                    type="number"
                    value={customExpenses[cat.key.replace('averageRent', 'rent')] || cat.value}
                    onChange={(e) => setCustomExpenses({
                      ...customExpenses,
                      [cat.key.replace('averageRent', 'rent')]: Number(e.target.value),
                    })}
                    className="w-28 px-2 py-1 text-right border border-gray-300 rounded text-sm"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-900">
                    {currency}{cat.value.toLocaleString()}
                  </span>
                )}
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="font-medium text-gray-900">Total Monthly</span>
              <span className="font-bold text-lg text-gray-900">
                {currency}{actualMonthly.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Target & Progress */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Your Target Emergency Fund</p>
            <p className="text-4xl font-bold text-gray-900">
              {currency}{targetAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">({targetMonthsCount} months × {currency}{actualMonthly.toLocaleString()}/mo)</p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Current Savings</span>
              <span className="font-medium text-green-600">
                {currency}{currentSavings.toLocaleString()} ({progressPercent.toFixed(0)}%)
              </span>
            </div>
            <div className="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  progressPercent >= 100 ? 'bg-green-500' : progressPercent >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {amountNeeded > 0 ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-orange-600">
                {currency}{amountNeeded.toLocaleString()} more to go
              </p>
              {monthsToGoal > 0 && (
                <p className="text-sm text-gray-500">
                  ~{monthsToGoal} months if saving 20% of income
                </p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-semibold text-green-600">
                🎉 Goal reached! You&apos;re protected!
              </p>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="p-4 bg-yellow-50 rounded-xl">
          <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <span>💡</span>
            Tips for Building Your Emergency Fund
          </h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Start with at least 3 months of expenses as your first goal</li>
            <li>• Keep emergency fund in a high-interest savings account</li>
            <li>• Don&apos;t touch it for non-emergencies (wants vs needs)</li>
            <li>• Automate transfers on payday using GCash/Maya auto-save</li>
            <li>• Consider MP2 Pag-IBIG for higher interest (5-year lock)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export { cityData };
export type { CityLivingCost };
