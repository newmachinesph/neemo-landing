'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SariSariTransaction {
  id: string;
  type: 'sale' | 'expense' | 'utang' | 'bayad';
  description: string;
  amount: number;
  customerName?: string;
  date: string;
  isPaid?: boolean;
}

interface SariSariModeProps {
  transactions: SariSariTransaction[];
  onAddTransaction: (transaction: Omit<SariSariTransaction, 'id' | 'date'>) => void;
  currency?: string;
  className?: string;
}

const quickSaleItems = [
  { name: 'Yosi (stick)', price: 7 },
  { name: 'Softdrinks', price: 20 },
  { name: 'Load ₱10', price: 10 },
  { name: 'Load ₱20', price: 20 },
  { name: 'Load ₱50', price: 50 },
  { name: 'Kape 3-in-1', price: 8 },
  { name: 'Noodles', price: 15 },
  { name: 'Canned Goods', price: 25 },
  { name: 'Bread', price: 35 },
  { name: 'Ice', price: 5 },
  { name: 'Sabaw (tubig)', price: 1 },
  { name: 'Candy/Sweets', price: 2 },
];

export function SariSariMode({
  transactions,
  onAddTransaction,
  currency = '₱',
  className,
}: SariSariModeProps) {
  const [activeTab, setActiveTab] = useState<'sales' | 'utang' | 'expenses'>('sales');
  const [showQuickSale, setShowQuickSale] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customerName, setCustomerName] = useState('');

  const todaySales = useMemo(() => {
    const today = new Date().toDateString();
    return transactions
      .filter((t) => t.type === 'sale' && new Date(t.date).toDateString() === today)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalUtang = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'utang' && !t.isPaid)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const todayExpenses = useMemo(() => {
    const today = new Date().toDateString();
    return transactions
      .filter((t) => t.type === 'expense' && new Date(t.date).toDateString() === today)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const handleQuickSale = (item: typeof quickSaleItems[0]) => {
    onAddTransaction({
      type: 'sale',
      description: item.name,
      amount: item.price,
    });
  };

  const handleCustomTransaction = () => {
    if (!customAmount || !customDescription) return;

    const type = activeTab === 'sales' ? 'sale' : activeTab === 'utang' ? 'utang' : 'expense';
    onAddTransaction({
      type,
      description: customDescription,
      amount: Number(customAmount),
      customerName: type === 'utang' ? customerName : undefined,
    });

    setCustomAmount('');
    setCustomDescription('');
    setCustomerName('');
  };

  const utangList = transactions.filter((t) => t.type === 'utang' && !t.isPaid);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏪</span>
          Sari-Sari Store Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-600 mb-1">Today&apos;s Sales</p>
            <p className="text-lg font-bold text-green-700">
              {currency}{todaySales.toLocaleString()}
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xs text-orange-600 mb-1">Total Utang</p>
            <p className="text-lg font-bold text-orange-700">
              {currency}{totalUtang.toLocaleString()}
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-xs text-red-600 mb-1">Today&apos;s Gastos</p>
            <p className="text-lg font-bold text-red-700">
              {currency}{todayExpenses.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {(['sales', 'utang', 'expenses'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {tab === 'sales' && '💰 Benta'}
              {tab === 'utang' && '📝 Utang'}
              {tab === 'expenses' && '📦 Gastos'}
            </button>
          ))}
        </div>

        {/* Quick Sale Grid */}
        {activeTab === 'sales' && (
          <>
            <button
              onClick={() => setShowQuickSale(!showQuickSale)}
              className="w-full mb-4 py-2 text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2"
            >
              {showQuickSale ? 'Hide' : 'Show'} Quick Sale Items
              <svg
                className={cn('w-4 h-4 transition-transform', showQuickSale && 'rotate-180')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showQuickSale && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickSaleItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleQuickSale(item)}
                    className="p-3 bg-gray-50 rounded-lg text-center hover:bg-blue-50 hover:border-blue-300 border border-gray-200 transition-colors"
                  >
                    <p className="text-xs text-gray-600 truncate">{item.name}</p>
                    <p className="text-sm font-semibold text-gray-900">{currency}{item.price}</p>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Utang List */}
        {activeTab === 'utang' && utangList.length > 0 && (
          <div className="mb-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">May utang pa:</p>
            {utangList.slice(0, 5).map((utang) => (
              <div
                key={utang.id}
                className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{utang.customerName || 'Customer'}</p>
                  <p className="text-sm text-gray-500">{utang.description}</p>
                </div>
                <p className="font-semibold text-orange-600">
                  {currency}{utang.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Custom Entry Form */}
        <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm font-medium text-gray-700">
            {activeTab === 'sales' && 'Add Sale'}
            {activeTab === 'utang' && 'Record Utang'}
            {activeTab === 'expenses' && 'Add Expense'}
          </p>

          {activeTab === 'utang' && (
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Customer name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}

          <input
            type="text"
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder={activeTab === 'expenses' ? 'Item purchased (e.g., Paninda restock)' : 'Item sold'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <Button onClick={handleCustomTransaction} className="w-full">
            {activeTab === 'sales' && '+ Add Sale'}
            {activeTab === 'utang' && '+ Record Utang'}
            {activeTab === 'expenses' && '+ Add Expense'}
          </Button>
        </div>

        {/* Today's Profit */}
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today&apos;s Net</p>
              <p className={cn(
                'text-2xl font-bold',
                todaySales - todayExpenses >= 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {currency}{(todaySales - todayExpenses).toLocaleString()}
              </p>
            </div>
            <div className="text-4xl">
              {todaySales - todayExpenses >= 0 ? '📈' : '📉'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
