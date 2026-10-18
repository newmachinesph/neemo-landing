'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CategorySuggestion {
  category: string;
  subcategory?: string;
  confidence: number;
  icon: string;
}

interface SmartCategorizationProps {
  description: string;
  amount: number;
  onSelectCategory: (category: string, subcategory?: string) => void;
  className?: string;
}

// Keyword to category mapping for Philippines
const categoryKeywords: Record<string, { category: string; subcategory?: string; icon: string; keywords: string[] }[]> = {
  food: [
    { category: 'Food & Dining', subcategory: 'Fast Food', icon: '🍔', keywords: ['jollibee', 'mcdonalds', 'mcdo', 'kfc', 'burger king', 'wendy', 'chowking', 'greenwich', 'pizza hut', 'shakey'] },
    { category: 'Food & Dining', subcategory: 'Coffee', icon: '☕', keywords: ['starbucks', 'coffee bean', 'tim hortons', 'dunkin', 'cbtl', 'bo\'s coffee', 'seattle'] },
    { category: 'Food & Dining', subcategory: 'Restaurant', icon: '🍽️', keywords: ['restaurant', 'resto', 'dine', 'dinner', 'lunch', 'breakfast', 'meal', 'eat', 'foodpanda', 'grabfood'] },
    { category: 'Food & Dining', subcategory: 'Groceries', icon: '🛒', keywords: ['sm supermarket', 'puregold', 'robinsons', 's&r', 'landers', 'metro mart', 'waltermart', 'grocery', 'merkado'] },
    { category: 'Food & Dining', subcategory: 'Snacks', icon: '🍿', keywords: ['7-eleven', '7eleven', 'ministop', 'family mart', 'alfamart', 'snack', 'chips'] },
  ],
  transport: [
    { category: 'Transportation', subcategory: 'Ride-hailing', icon: '🚗', keywords: ['grab', 'angkas', 'joyride', 'moveit', 'lalamove', 'mr speedy'] },
    { category: 'Transportation', subcategory: 'Fuel', icon: '⛽', keywords: ['petron', 'shell', 'caltex', 'phoenix', 'seaoil', 'gasoline', 'diesel', 'fuel', 'gas'] },
    { category: 'Transportation', subcategory: 'Public Transit', icon: '🚌', keywords: ['mrt', 'lrt', 'beep', 'jeep', 'jeepney', 'bus', 'fare', 'tricycle', 'uv express'] },
    { category: 'Transportation', subcategory: 'Parking', icon: '🅿️', keywords: ['parking', 'park'] },
    { category: 'Transportation', subcategory: 'Toll', icon: '🛣️', keywords: ['autosweep', 'easytrip', 'toll', 'nlex', 'slex', 'tplex', 'calax', 'cavitex'] },
  ],
  utilities: [
    { category: 'Utilities', subcategory: 'Electric', icon: '💡', keywords: ['meralco', 'electric', 'electricity', 'power'] },
    { category: 'Utilities', subcategory: 'Water', icon: '💧', keywords: ['maynilad', 'manila water', 'water bill', 'tubig'] },
    { category: 'Utilities', subcategory: 'Internet', icon: '📶', keywords: ['pldt', 'globe', 'converge', 'sky', 'internet', 'wifi', 'fiber'] },
    { category: 'Utilities', subcategory: 'Phone', icon: '📱', keywords: ['smart', 'tnt', 'sun', 'dito', 'postpaid', 'prepaid', 'load', 'mobile'] },
  ],
  shopping: [
    { category: 'Shopping', subcategory: 'Online', icon: '📦', keywords: ['shopee', 'lazada', 'zalora', 'amazon', 'online shop', 'cod'] },
    { category: 'Shopping', subcategory: 'Clothes', icon: '👕', keywords: ['uniqlo', 'h&m', 'zara', 'penshoppe', 'bench', 'forever 21', 'cotton on', 'clothes', 'apparel'] },
    { category: 'Shopping', subcategory: 'Electronics', icon: '📱', keywords: ['power mac', 'digital walker', 'datablitz', 'abenson', 'octagon', 'complink', 'silicon valley'] },
    { category: 'Shopping', subcategory: 'Department Store', icon: '🏬', keywords: ['sm department', 'landmark', 'robinsons department', 'metro', 'gaisano'] },
  ],
  health: [
    { category: 'Healthcare', subcategory: 'Pharmacy', icon: '💊', keywords: ['mercury drug', 'watsons', 'southstar', 'rose pharmacy', 'generics', 'medicine', 'vitamins'] },
    { category: 'Healthcare', subcategory: 'Doctor', icon: '👨‍⚕️', keywords: ['doctor', 'hospital', 'clinic', 'checkup', 'medical', 'consultation'] },
    { category: 'Healthcare', subcategory: 'Dental', icon: '🦷', keywords: ['dentist', 'dental', 'teeth', 'cleaning'] },
  ],
  entertainment: [
    { category: 'Entertainment', subcategory: 'Streaming', icon: '📺', keywords: ['netflix', 'spotify', 'youtube', 'hbo', 'disney', 'viu', 'iqiyi', 'subscription'] },
    { category: 'Entertainment', subcategory: 'Movies', icon: '🎬', keywords: ['sm cinema', 'ayala cinema', 'imax', 'movie', 'film'] },
    { category: 'Entertainment', subcategory: 'Gaming', icon: '🎮', keywords: ['steam', 'playstation', 'xbox', 'nintendo', 'game', 'gaming', 'mobile legends', 'cod'] },
  ],
  bills: [
    { category: 'Bills', subcategory: 'Rent', icon: '🏠', keywords: ['rent', 'upa', 'rental', 'apartment', 'condo'] },
    { category: 'Bills', subcategory: 'Insurance', icon: '🛡️', keywords: ['sunlife', 'pru life', 'axa', 'manulife', 'insurance', 'hmo', 'philam'] },
    { category: 'Bills', subcategory: 'Loans', icon: '💳', keywords: ['loan', 'amortization', 'hulugan', 'installment', 'sss', 'pagibig', 'bank'] },
  ],
  income: [
    { category: 'Income', subcategory: 'Salary', icon: '💰', keywords: ['salary', 'sweldo', 'payroll', 'sahod'] },
    { category: 'Income', subcategory: 'Bonus', icon: '🎁', keywords: ['bonus', '13th month', 'thirteenth', 'incentive'] },
    { category: 'Income', subcategory: 'Freelance', icon: '💼', keywords: ['freelance', 'client', 'project', 'upwork', 'fiverr'] },
  ],
};

const suggestCategories = (description: string, amount: number): CategorySuggestion[] => {
  const lowerDesc = description.toLowerCase();
  const suggestions: CategorySuggestion[] = [];

  // Check all keywords
  Object.values(categoryKeywords).flat().forEach((mapping) => {
    mapping.keywords.forEach((keyword) => {
      if (lowerDesc.includes(keyword.toLowerCase())) {
        const existingIndex = suggestions.findIndex(
          (s) => s.category === mapping.category && s.subcategory === mapping.subcategory
        );

        if (existingIndex === -1) {
          suggestions.push({
            category: mapping.category,
            subcategory: mapping.subcategory,
            confidence: 0.85 + Math.random() * 0.1,
            icon: mapping.icon,
          });
        }
      }
    });
  });

  // If no matches, suggest based on amount
  if (suggestions.length === 0) {
    if (amount > 10000) {
      suggestions.push({ category: 'Bills', confidence: 0.5, icon: '📄' });
      suggestions.push({ category: 'Shopping', confidence: 0.4, icon: '🛍️' });
    } else if (amount > 1000) {
      suggestions.push({ category: 'Food & Dining', confidence: 0.5, icon: '🍽️' });
      suggestions.push({ category: 'Shopping', confidence: 0.4, icon: '🛍️' });
    } else {
      suggestions.push({ category: 'Food & Dining', confidence: 0.5, icon: '🍔' });
      suggestions.push({ category: 'Transportation', confidence: 0.4, icon: '🚗' });
    }
  }

  return suggestions.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
};

export function SmartCategorization({
  description,
  amount,
  onSelectCategory,
  className,
}: SmartCategorizationProps) {
  const suggestions = useMemo(
    () => suggestCategories(description, amount),
    [description, amount]
  );

  const topSuggestion = suggestions[0];

  return (
    <div className={cn('space-y-3', className)}>
      {/* Top suggestion */}
      {topSuggestion && (
        <button
          onClick={() => onSelectCategory(topSuggestion.category, topSuggestion.subcategory)}
          className="w-full p-4 bg-blue-50 border-2 border-blue-300 rounded-xl flex items-center gap-4 hover:bg-blue-100 transition-colors"
        >
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
            {topSuggestion.icon}
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{topSuggestion.category}</span>
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                {Math.round(topSuggestion.confidence * 100)}% match
              </span>
            </div>
            {topSuggestion.subcategory && (
              <p className="text-sm text-gray-500">{topSuggestion.subcategory}</p>
            )}
          </div>
          <span className="text-blue-500">✓</span>
        </button>
      )}

      {/* Other suggestions */}
      {suggestions.length > 1 && (
        <div className="grid grid-cols-2 gap-2">
          {suggestions.slice(1).map((suggestion, index) => (
            <button
              key={`${suggestion.category}-${suggestion.subcategory}-${index}`}
              onClick={() => onSelectCategory(suggestion.category, suggestion.subcategory)}
              className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl">{suggestion.icon}</span>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{suggestion.category}</p>
                {suggestion.subcategory && (
                  <p className="text-xs text-gray-500 truncate">{suggestion.subcategory}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Recurring detection component
interface RecurringDetectionProps {
  transaction: { description: string; amount: number; date: string };
  similarTransactions: { description: string; amount: number; date: string }[];
  onMakeRecurring: () => void;
  onDismiss: () => void;
}

export function RecurringDetection({
  transaction,
  similarTransactions,
  onMakeRecurring,
  onDismiss,
}: RecurringDetectionProps) {
  if (similarTransactions.length < 2) return null;

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <span className="text-xl">🔄</span>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">Recurring expense detected!</h4>
          <p className="text-sm text-gray-600 mt-1">
            We found {similarTransactions.length} similar transactions for &quot;{transaction.description}&quot;.
            Would you like to make this a recurring expense?
          </p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={onMakeRecurring}>
              Make Recurring
            </Button>
            <Button size="sm" variant="outline" onClick={onDismiss}>
              Not Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { suggestCategories, categoryKeywords };
export type { CategorySuggestion };
