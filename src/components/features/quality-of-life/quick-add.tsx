'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface QuickCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  lastAmount?: number;
}

interface RecentEntry {
  id: string;
  amount: number;
  category: string;
  note?: string;
  timestamp: string;
}

interface QuickAddProps {
  categories?: QuickCategory[];
  recentEntries?: RecentEntry[];
  onAdd?: (amount: number, categoryId: string, note?: string) => void;
  className?: string;
}

const defaultCategories: QuickCategory[] = [
  { id: 'food', name: 'Food', icon: '🍔', color: 'bg-orange-100 border-orange-300', lastAmount: 150 },
  { id: 'transport', name: 'Transport', icon: '🚌', color: 'bg-blue-100 border-blue-300', lastAmount: 25 },
  { id: 'groceries', name: 'Groceries', icon: '🛒', color: 'bg-green-100 border-green-300', lastAmount: 500 },
  { id: 'coffee', name: 'Coffee', icon: '☕', color: 'bg-amber-100 border-amber-300', lastAmount: 180 },
  { id: 'bills', name: 'Bills', icon: '📄', color: 'bg-red-100 border-red-300', lastAmount: 2500 },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'bg-pink-100 border-pink-300', lastAmount: 750 },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'bg-purple-100 border-purple-300', lastAmount: 350 },
  { id: 'health', name: 'Health', icon: '💊', color: 'bg-teal-100 border-teal-300', lastAmount: 200 },
];

const demoRecent: RecentEntry[] = [
  { id: 'r1', amount: 185, category: 'Food', note: 'Jollibee lunch', timestamp: '2 mins ago' },
  { id: 'r2', amount: 25, category: 'Transport', note: 'Jeep to office', timestamp: '1 hour ago' },
  { id: 'r3', amount: 890, category: 'Groceries', timestamp: '3 hours ago' },
];

const quickAmounts = [50, 100, 200, 500, 1000, 2000];

export function QuickAdd({
  categories = defaultCategories,
  recentEntries = demoRecent,
  onAdd,
  className,
}: QuickAddProps) {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = categories.find((c) => c.id === categoryId);
    if (category?.lastAmount && !amount) {
      setAmount(category.lastAmount.toString());
    }
  };

  const handleSubmit = () => {
    if (!amount || !selectedCategory) return;

    onAdd?.(parseFloat(amount), selectedCategory, note || undefined);

    // Show success feedback
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    // Reset form
    setAmount('');
    setSelectedCategory(null);
    setNote('');
  };

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>⚡</span>
          Quick Add Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-xl text-green-700 text-center animate-pulse">
            ✅ Expense added successfully!
          </div>
        )}

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">₱</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full pl-12 pr-4 py-4 text-3xl font-bold text-center border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            {quickAmounts.map((value) => (
              <button
                key={value}
                onClick={() => handleQuickAmount(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  amount === value.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ₱{value}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} border-2 scale-105`
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl block mb-1">{category.icon}</span>
                <span className="text-xs text-gray-700">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What was this for?"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Preview */}
        {selectedCategory && amount && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-2">Preview</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedCategoryData?.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{selectedCategoryData?.name}</p>
                  {note && <p className="text-xs text-gray-500">{note}</p>}
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">₱{parseFloat(amount).toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!amount || !selectedCategory}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            amount && selectedCategory
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-98'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Add Expense
        </button>

        {/* Recent Entries */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Entries</h4>
          <div className="space-y-2">
            {recentEntries.map((entry) => {
              const category = categories.find((c) => c.name === entry.category);
              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category?.icon || '📝'}</span>
                    <div>
                      <p className="font-medium text-gray-900">₱{entry.amount}</p>
                      <p className="text-xs text-gray-500">
                        {entry.note || entry.category} • {entry.timestamp}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    ✏️
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Keyboard Shortcut Hint */}
        <div className="mt-4 text-center text-xs text-gray-400">
          💡 Tip: Press Enter to quickly add after filling amount and category
        </div>
      </CardContent>
    </Card>
  );
}
