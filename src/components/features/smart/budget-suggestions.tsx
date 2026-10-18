'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BudgetSuggestion {
  category: string;
  icon: string;
  suggestedAmount: number;
  currentSpending: number;
  percentOfIncome: number;
  reason: string;
  priority: 'essential' | 'important' | 'discretionary';
}

interface BudgetSuggestionsProps {
  monthlyIncome: number;
  currentBudgets: { category: string; amount: number; spent: number }[];
  onApplySuggestion: (category: string, amount: number) => void;
  onApplyAll: (suggestions: BudgetSuggestion[]) => void;
  currency?: string;
  className?: string;
}

// Budget allocation rules based on Filipino financial planning
const allocationRules = {
  essential: [
    { category: 'Housing & Rent', icon: '🏠', minPercent: 25, maxPercent: 30, reason: 'Should not exceed 30% of income' },
    { category: 'Food & Groceries', icon: '🛒', minPercent: 15, maxPercent: 20, reason: 'Essential for daily nutrition' },
    { category: 'Utilities', icon: '💡', minPercent: 5, maxPercent: 10, reason: 'Electricity, water, internet' },
    { category: 'Transportation', icon: '🚌', minPercent: 10, maxPercent: 15, reason: 'Getting to work and errands' },
  ],
  important: [
    { category: 'Savings & Emergency', icon: '🏦', minPercent: 10, maxPercent: 20, reason: 'Pay yourself first!' },
    { category: 'Healthcare', icon: '💊', minPercent: 3, maxPercent: 5, reason: 'Medicine and checkups' },
    { category: 'Debt Repayment', icon: '💳', minPercent: 0, maxPercent: 15, reason: 'Pay off debt faster' },
    { category: 'Insurance', icon: '🛡️', minPercent: 3, maxPercent: 5, reason: 'Life, health, HMO coverage' },
  ],
  discretionary: [
    { category: 'Entertainment', icon: '🎬', minPercent: 3, maxPercent: 8, reason: 'Movies, subscriptions, leisure' },
    { category: 'Dining Out', icon: '🍽️', minPercent: 3, maxPercent: 8, reason: 'Restaurants and takeout' },
    { category: 'Personal Care', icon: '💅', minPercent: 2, maxPercent: 5, reason: 'Grooming and self-care' },
    { category: 'Shopping', icon: '🛍️', minPercent: 3, maxPercent: 8, reason: 'Clothes and non-essentials' },
  ],
};

const generateSuggestions = (
  monthlyIncome: number,
  currentBudgets: { category: string; amount: number; spent: number }[]
): BudgetSuggestion[] => {
  const suggestions: BudgetSuggestion[] = [];

  Object.entries(allocationRules).forEach(([priority, rules]) => {
    rules.forEach((rule) => {
      const current = currentBudgets.find(
        (b) => b.category.toLowerCase().includes(rule.category.toLowerCase())
      );
      const avgPercent = (rule.minPercent + rule.maxPercent) / 2;
      const suggestedAmount = Math.round((monthlyIncome * avgPercent) / 100);

      suggestions.push({
        category: rule.category,
        icon: rule.icon,
        suggestedAmount,
        currentSpending: current?.spent || 0,
        percentOfIncome: avgPercent,
        reason: rule.reason,
        priority: priority as 'essential' | 'important' | 'discretionary',
      });
    });
  });

  return suggestions;
};

function SuggestionCard({
  suggestion,
  currency = '₱',
  onApply,
}: {
  suggestion: BudgetSuggestion;
  currency?: string;
  onApply: () => void;
}) {
  const priorityColors = {
    essential: 'border-red-200 bg-red-50',
    important: 'border-blue-200 bg-blue-50',
    discretionary: 'border-green-200 bg-green-50',
  };

  const priorityLabels = {
    essential: { label: 'Essential', color: 'bg-red-100 text-red-700' },
    important: { label: 'Important', color: 'bg-blue-100 text-blue-700' },
    discretionary: { label: 'Discretionary', color: 'bg-green-100 text-green-700' },
  };

  const diff = suggestion.suggestedAmount - suggestion.currentSpending;

  return (
    <div className={cn('p-4 rounded-xl border', priorityColors[suggestion.priority])}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
            {suggestion.icon}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{suggestion.category}</h4>
            <span className={cn('text-xs px-2 py-0.5 rounded-full', priorityLabels[suggestion.priority].color)}>
              {priorityLabels[suggestion.priority].label}
            </span>
          </div>
        </div>
        <button
          onClick={onApply}
          className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Apply
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Suggested Budget</span>
          <span className="font-semibold text-gray-900">
            {currency}{suggestion.suggestedAmount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Current Spending</span>
          <span className="text-gray-700">
            {currency}{suggestion.currentSpending.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">% of Income</span>
          <span className="text-gray-700">{suggestion.percentOfIncome}%</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>💡</span>
          {suggestion.reason}
        </p>
      </div>
    </div>
  );
}

export function BudgetSuggestions({
  monthlyIncome,
  currentBudgets,
  onApplySuggestion,
  onApplyAll,
  currency = '₱',
  className,
}: BudgetSuggestionsProps) {
  const suggestions = useMemo(
    () => generateSuggestions(monthlyIncome, currentBudgets),
    [monthlyIncome, currentBudgets]
  );

  const totalSuggested = suggestions.reduce((sum, s) => sum + s.suggestedAmount, 0);
  const savingsAmount = monthlyIncome - totalSuggested;

  const essentialSuggestions = suggestions.filter((s) => s.priority === 'essential');
  const importantSuggestions = suggestions.filter((s) => s.priority === 'important');
  const discretionarySuggestions = suggestions.filter((s) => s.priority === 'discretionary');

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🤖</span>
          AI Budget Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Income Summary */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Monthly Income</p>
              <p className="text-lg font-bold text-gray-900">
                {currency}{monthlyIncome.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Suggested Spending</p>
              <p className="text-lg font-bold text-blue-600">
                {currency}{totalSuggested.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Potential Savings</p>
              <p className="text-lg font-bold text-green-600">
                {currency}{Math.max(0, savingsAmount).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Apply All Button */}
        <div className="mb-6">
          <Button onClick={() => onApplyAll(suggestions)} className="w-full">
            Apply All Suggestions
          </Button>
        </div>

        {/* Essential */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-red-700 mb-3 flex items-center gap-2">
            <span>🔴</span>
            Essential (Needs)
          </h3>
          <div className="space-y-3">
            {essentialSuggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.category}
                suggestion={suggestion}
                currency={currency}
                onApply={() => onApplySuggestion(suggestion.category, suggestion.suggestedAmount)}
              />
            ))}
          </div>
        </div>

        {/* Important */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
            <span>🔵</span>
            Important (Financial Security)
          </h3>
          <div className="space-y-3">
            {importantSuggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.category}
                suggestion={suggestion}
                currency={currency}
                onApply={() => onApplySuggestion(suggestion.category, suggestion.suggestedAmount)}
              />
            ))}
          </div>
        </div>

        {/* Discretionary */}
        <div>
          <h3 className="text-sm font-medium text-green-700 mb-3 flex items-center gap-2">
            <span>🟢</span>
            Discretionary (Wants)
          </h3>
          <div className="space-y-3">
            {discretionarySuggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.category}
                suggestion={suggestion}
                currency={currency}
                onApply={() => onApplySuggestion(suggestion.category, suggestion.suggestedAmount)}
              />
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
          <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <span>💡</span>
            Budget Tips
          </h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
            <li>• Review and adjust your budget monthly</li>
            <li>• Build emergency fund before investing</li>
            <li>• Pay off high-interest debt first</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export { generateSuggestions, allocationRules };
export type { BudgetSuggestion };
