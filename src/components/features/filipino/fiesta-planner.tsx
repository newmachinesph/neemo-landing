'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FiestaExpense {
  id: string;
  category: string;
  description: string;
  estimatedCost: number;
  actualCost?: number;
  isPaid: boolean;
}

interface Fiesta {
  id: string;
  name: string;
  date: string;
  type: 'fiesta' | 'christmas' | 'birthday' | 'wedding' | 'baptism' | 'graduation' | 'other';
  budget: number;
  expenses: FiestaExpense[];
  notes?: string;
}

interface FiestaPlannerProps {
  fiestas: Fiesta[];
  onAddExpense?: (fiestaId: string, expense: Omit<FiestaExpense, 'id'>) => void;
  onUpdateExpense?: (fiestaId: string, expenseId: string, updates: Partial<FiestaExpense>) => void;
  currency?: string;
  className?: string;
}

const fiestaTypes = {
  fiesta: { label: 'Fiesta', icon: '🎊', color: 'from-red-50 to-orange-50' },
  christmas: { label: 'Christmas', icon: '🎄', color: 'from-red-50 to-green-50' },
  birthday: { label: 'Birthday', icon: '🎂', color: 'from-pink-50 to-purple-50' },
  wedding: { label: 'Wedding', icon: '💒', color: 'from-pink-50 to-rose-50' },
  baptism: { label: 'Baptism', icon: '⛪', color: 'from-blue-50 to-cyan-50' },
  graduation: { label: 'Graduation', icon: '🎓', color: 'from-blue-50 to-purple-50' },
  other: { label: 'Celebration', icon: '🎉', color: 'from-yellow-50 to-orange-50' },
};

const expenseCategories = [
  { id: 'food', name: 'Food & Drinks', icon: '🍖', suggestions: ['Lechon', 'Pancit', 'Lumpia', 'Rice', 'Desserts', 'Drinks'] },
  { id: 'venue', name: 'Venue', icon: '🏠', suggestions: ['Tent rental', 'Chairs/Tables', 'Decorations'] },
  { id: 'entertainment', name: 'Entertainment', icon: '🎤', suggestions: ['Videoke', 'Band/DJ', 'Games'] },
  { id: 'gifts', name: 'Gifts & Giveaways', icon: '🎁', suggestions: ['Souvenirs', 'Prizes', 'Gift bags'] },
  { id: 'attire', name: 'Attire', icon: '👗', suggestions: ['Outfits', 'Accessories', 'Hair & Makeup'] },
  { id: 'transportation', name: 'Transportation', icon: '🚗', suggestions: ['Gas', 'Rental', 'Parking'] },
  { id: 'other', name: 'Other', icon: '📦', suggestions: [] },
];

function FiestaCard({
  fiesta,
  currency = '₱',
  onAddExpense,
  onUpdateExpense,
}: {
  fiesta: Fiesta;
  currency?: string;
  onAddExpense?: (expense: Omit<FiestaExpense, 'id'>) => void;
  onUpdateExpense?: (expenseId: string, updates: Partial<FiestaExpense>) => void;
}) {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [newExpense, setNewExpense] = useState({ description: '', estimatedCost: 0 });

  const typeConfig = fiestaTypes[fiesta.type];
  const daysUntil = Math.ceil((new Date(fiesta.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const totalEstimated = fiesta.expenses.reduce((sum, e) => sum + e.estimatedCost, 0);
  const totalActual = fiesta.expenses.reduce((sum, e) => sum + (e.actualCost || 0), 0);
  const totalPaid = fiesta.expenses.filter((e) => e.isPaid).reduce((sum, e) => sum + (e.actualCost || e.estimatedCost), 0);
  const budgetRemaining = fiesta.budget - totalEstimated;

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.estimatedCost > 0 && onAddExpense) {
      onAddExpense({
        category: selectedCategory,
        description: newExpense.description,
        estimatedCost: newExpense.estimatedCost,
        isPaid: false,
      });
      setNewExpense({ description: '', estimatedCost: 0 });
      setShowAddExpense(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className={cn('p-4 bg-gradient-to-r', typeConfig.color)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-3xl shadow-sm">
              {typeConfig.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{fiesta.name}</h3>
              <p className="text-sm text-gray-500">{typeConfig.label}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={cn(
              'text-sm font-medium',
              daysUntil < 0 ? 'text-gray-500' : daysUntil <= 7 ? 'text-red-600' : 'text-gray-600'
            )}>
              {daysUntil < 0 ? 'Past event' : daysUntil === 0 ? 'Today!' : `${daysUntil} days to go`}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(fiesta.date).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Budget Progress</span>
          <span className={cn(
            'text-sm font-medium',
            budgetRemaining < 0 ? 'text-red-600' : 'text-green-600'
          )}>
            {budgetRemaining < 0 ? 'Over by ' : ''}{currency}{Math.abs(budgetRemaining).toLocaleString()}
            {budgetRemaining >= 0 ? ' remaining' : ''}
          </span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              totalEstimated > fiesta.budget ? 'bg-red-500' : 'bg-green-500'
            )}
            style={{ width: `${Math.min(100, (totalEstimated / fiesta.budget) * 100)}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
          <div>
            <p className="text-gray-500">Budget</p>
            <p className="font-semibold text-gray-900">{currency}{fiesta.budget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Estimated</p>
            <p className="font-semibold text-blue-600">{currency}{totalEstimated.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Paid</p>
            <p className="font-semibold text-green-600">{currency}{totalPaid.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Expenses */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Expense Checklist</h4>
          {onAddExpense && (
            <button
              onClick={() => setShowAddExpense(!showAddExpense)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + Add Expense
            </button>
          )}
        </div>

        {showAddExpense && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex flex-wrap gap-2">
              {expenseCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm flex items-center gap-1 transition-colors',
                    selectedCategory === cat.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {(expenseCategories.find((c) => c.id === selectedCategory)?.suggestions?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-1">
                {expenseCategories.find((c) => c.id === selectedCategory)?.suggestions?.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setNewExpense({ ...newExpense, description: sug })}
                    className="px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-blue-50"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            <input
              type="text"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              placeholder="Item description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="number"
              value={newExpense.estimatedCost || ''}
              onChange={(e) => setNewExpense({ ...newExpense, estimatedCost: Number(e.target.value) })}
              placeholder="Estimated cost"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <Button onClick={handleAddExpense} size="sm" className="w-full">
              Add to Checklist
            </Button>
          </div>
        )}

        {fiesta.expenses.length === 0 ? (
          <p className="text-center py-4 text-gray-500 text-sm">No expenses planned yet</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {fiesta.expenses.map((expense) => {
              const category = expenseCategories.find((c) => c.id === expense.category);
              return (
                <div
                  key={expense.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg transition-colors',
                    expense.isPaid ? 'bg-green-50' : 'bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateExpense?.(expense.id, { isPaid: !expense.isPaid })}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                        expense.isPaid
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      )}
                    >
                      {expense.isPaid && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div>
                      <p className={cn('text-sm font-medium', expense.isPaid ? 'text-gray-500 line-through' : 'text-gray-900')}>
                        {category?.icon} {expense.description}
                      </p>
                      <p className="text-xs text-gray-400">{category?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {currency}{expense.estimatedCost.toLocaleString()}
                    </p>
                    {expense.actualCost && expense.actualCost !== expense.estimatedCost && (
                      <p className="text-xs text-gray-500">
                        Actual: {currency}{expense.actualCost.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function FiestaPlanner({
  fiestas,
  onAddExpense,
  onUpdateExpense,
  currency = '₱',
  className,
}: FiestaPlannerProps) {
  const upcomingFiestas = fiestas.filter((f) => new Date(f.date) >= new Date());
  const totalBudget = upcomingFiestas.reduce((sum, f) => sum + f.budget, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🎊</span>
          Fiesta Budget Planner
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingFiestas.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Budget Needed</p>
              <p className="text-2xl font-bold text-orange-600">{currency}{totalBudget.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Event Cards */}
        {fiestas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎉</div>
            <p>No events planned</p>
            <p className="text-sm">Plan your next fiesta, birthday, or celebration!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {fiestas.map((fiesta) => (
              <FiestaCard
                key={fiesta.id}
                fiesta={fiesta}
                currency={currency}
                onAddExpense={onAddExpense ? (expense) => onAddExpense(fiesta.id, expense) : undefined}
                onUpdateExpense={onUpdateExpense ? (expenseId, updates) => onUpdateExpense(fiesta.id, expenseId, updates) : undefined}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { Fiesta, FiestaExpense };
