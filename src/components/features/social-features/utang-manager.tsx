'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Payment {
  id: string;
  date: string;
  amount: number;
  note?: string;
}

interface Utang {
  id: string;
  type: 'borrowed' | 'lent';
  person: string;
  avatar: string;
  originalAmount: number;
  remainingAmount: number;
  date: string;
  dueDate?: string;
  reason: string;
  payments: Payment[];
  status: 'active' | 'partially_paid' | 'overdue' | 'paid';
}

interface UtangManagerProps {
  utangs?: Utang[];
  className?: string;
}

const demoUtangs: Utang[] = [
  {
    id: 'u1',
    type: 'lent',
    person: 'Juan',
    avatar: '👨',
    originalAmount: 5000,
    remainingAmount: 3000,
    date: '2024-01-01',
    dueDate: '2024-02-01',
    reason: 'Emergency',
    status: 'partially_paid',
    payments: [
      { id: 'p1', date: '2024-01-10', amount: 2000, note: 'First payment' },
    ],
  },
  {
    id: 'u2',
    type: 'lent',
    person: 'Maria',
    avatar: '👩',
    originalAmount: 2500,
    remainingAmount: 2500,
    date: '2024-01-05',
    dueDate: '2024-01-20',
    reason: 'Birthday gift ni anak',
    status: 'overdue',
    payments: [],
  },
  {
    id: 'u3',
    type: 'borrowed',
    person: 'Papa',
    avatar: '👴',
    originalAmount: 10000,
    remainingAmount: 5000,
    date: '2023-12-15',
    reason: 'Car repair',
    status: 'partially_paid',
    payments: [
      { id: 'p2', date: '2024-01-01', amount: 3000 },
      { id: 'p3', date: '2024-01-15', amount: 2000 },
    ],
  },
  {
    id: 'u4',
    type: 'lent',
    person: 'Mark',
    avatar: '🧑',
    originalAmount: 1000,
    remainingAmount: 0,
    date: '2024-01-02',
    reason: 'Lunch money',
    status: 'paid',
    payments: [
      { id: 'p4', date: '2024-01-08', amount: 1000 },
    ],
  },
  {
    id: 'u5',
    type: 'borrowed',
    person: 'Ate',
    avatar: '👩‍🦰',
    originalAmount: 3000,
    remainingAmount: 3000,
    date: '2024-01-12',
    dueDate: '2024-02-12',
    reason: 'Bills',
    status: 'active',
    payments: [],
  },
];

export function UtangManager({
  utangs = demoUtangs,
  className,
}: UtangManagerProps) {
  const stats = useMemo(() => {
    const totalLent = utangs
      .filter((u) => u.type === 'lent' && u.status !== 'paid')
      .reduce((sum, u) => sum + u.remainingAmount, 0);
    const totalBorrowed = utangs
      .filter((u) => u.type === 'borrowed' && u.status !== 'paid')
      .reduce((sum, u) => sum + u.remainingAmount, 0);
    const overdue = utangs.filter((u) => u.status === 'overdue').length;
    const netPosition = totalLent - totalBorrowed;

    return { totalLent, totalBorrowed, overdue, netPosition };
  }, [utangs]);

  const activeUtangs = utangs.filter((u) => u.status !== 'paid');
  const lentUtangs = activeUtangs.filter((u) => u.type === 'lent');
  const borrowedUtangs = activeUtangs.filter((u) => u.type === 'borrowed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'partially_paid': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'overdue': return 'Overdue';
      case 'partially_paid': return 'Partial';
      default: return 'Active';
    }
  };

  const getDaysUntilDue = (dueDate?: string) => {
    if (!dueDate) return null;
    const due = new Date(dueDate);
    const today = new Date();
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🤝</span>
          Utang Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Pinahiram Ko</p>
            <p className="text-xl font-bold text-green-700">₱{stats.totalLent.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-xs text-red-600 mb-1">Utang Ko</p>
            <p className="text-xl font-bold text-red-700">₱{stats.totalBorrowed.toLocaleString()}</p>
          </div>
          <div className={`rounded-xl p-4 text-center ${stats.netPosition >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
            <p className={`text-xs mb-1 ${stats.netPosition >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
              Net Position
            </p>
            <p className={`text-xl font-bold ${stats.netPosition >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
              {stats.netPosition >= 0 ? '+' : ''}₱{stats.netPosition.toLocaleString()}
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-600 mb-1">Overdue</p>
            <p className="text-xl font-bold text-amber-700">{stats.overdue}</p>
          </div>
        </div>

        {/* Money I Lent */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <span>💸</span> Pinahiram Ko (Money I Lent)
          </h4>
          {lentUtangs.length > 0 ? (
            <div className="space-y-3">
              {lentUtangs.map((utang) => {
                const progress = ((utang.originalAmount - utang.remainingAmount) / utang.originalAmount) * 100;
                const daysUntilDue = getDaysUntilDue(utang.dueDate);

                return (
                  <div
                    key={utang.id}
                    className={`p-4 rounded-xl border-2 ${
                      utang.status === 'overdue' ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{utang.avatar}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{utang.person}</p>
                          <p className="text-xs text-gray-500">{utang.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₱{utang.remainingAmount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(utang.status)}`}>
                          {getStatusLabel(utang.status)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₱{(utang.originalAmount - utang.remainingAmount).toLocaleString()} paid</span>
                        <span>₱{utang.originalAmount.toLocaleString()} total</span>
                      </div>
                    </div>

                    {/* Due Date */}
                    {utang.dueDate && (
                      <p className={`text-xs ${
                        daysUntilDue && daysUntilDue < 0 ? 'text-red-600' :
                        daysUntilDue && daysUntilDue <= 7 ? 'text-orange-600' : 'text-gray-500'
                      }`}>
                        {daysUntilDue && daysUntilDue < 0
                          ? `⚠️ Overdue by ${Math.abs(daysUntilDue)} days`
                          : `Due: ${new Date(utang.dueDate).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} (${daysUntilDue} days)`}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors">
                        Record Payment
                      </button>
                      <button className="py-2 px-4 bg-gray-200 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-300 transition-colors">
                        Remind
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No active loans</p>
          )}
        </div>

        {/* Money I Borrowed */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <span>📥</span> Utang Ko (Money I Borrowed)
          </h4>
          {borrowedUtangs.length > 0 ? (
            <div className="space-y-3">
              {borrowedUtangs.map((utang) => {
                const progress = ((utang.originalAmount - utang.remainingAmount) / utang.originalAmount) * 100;
                const daysUntilDue = getDaysUntilDue(utang.dueDate);

                return (
                  <div
                    key={utang.id}
                    className="p-4 rounded-xl border-2 border-gray-200 bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{utang.avatar}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{utang.person}</p>
                          <p className="text-xs text-gray-500">{utang.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">₱{utang.remainingAmount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(utang.status)}`}>
                          {getStatusLabel(utang.status)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Due Date */}
                    {utang.dueDate && (
                      <p className={`text-xs ${
                        daysUntilDue && daysUntilDue < 0 ? 'text-red-600' :
                        daysUntilDue && daysUntilDue <= 7 ? 'text-orange-600' : 'text-gray-500'
                      }`}>
                        Due: {new Date(utang.dueDate).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                        {daysUntilDue !== null && ` (${daysUntilDue} days)`}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Pay Now
                      </button>
                      <button className="py-2 px-4 bg-gray-200 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-300 transition-colors">
                        History
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No outstanding debts 🎉</p>
          )}
        </div>

        {/* Add New */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="p-4 border-2 border-dashed border-green-300 rounded-xl text-center hover:border-green-500 hover:bg-green-50 transition-colors">
            <span className="text-2xl mb-1 block">💸</span>
            <span className="font-medium text-green-700">Record Loan Given</span>
          </button>
          <button className="p-4 border-2 border-dashed border-blue-300 rounded-xl text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <span className="text-2xl mb-1 block">📥</span>
            <span className="font-medium text-blue-700">Record Borrowed</span>
          </button>
        </div>

        {/* Tips */}
        <div className="p-4 bg-amber-50 rounded-xl">
          <h4 className="font-medium text-amber-900 mb-2">💡 Utang Tips</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Always document loans with date and reason</li>
            <li>• Set clear repayment terms from the start</li>
            <li>• Don&apos;t lend money you can&apos;t afford to lose</li>
            <li>• Consider it a gift if you value the relationship more</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
