'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface BillReminder {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  icon: string;
  isAutoPay?: boolean;
  isPaid?: boolean;
}

interface BillRemindersProps {
  bills: BillReminder[];
  currency?: string;
  className?: string;
  onPayBill?: (id: string) => void;
}

const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const getUrgencyStyles = (daysUntil: number, isPaid?: boolean) => {
  if (isPaid) {
    return {
      badge: 'bg-green-100 text-green-700 border-green-200',
      text: 'text-green-600',
      bg: 'bg-green-50',
    };
  }
  if (daysUntil < 0) {
    return {
      badge: 'bg-red-100 text-red-700 border-red-200',
      text: 'text-red-600',
      bg: 'bg-red-50',
    };
  }
  if (daysUntil <= 3) {
    return {
      badge: 'bg-orange-100 text-orange-700 border-orange-200',
      text: 'text-orange-600',
      bg: 'bg-orange-50',
    };
  }
  if (daysUntil <= 7) {
    return {
      badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      text: 'text-yellow-600',
      bg: 'bg-yellow-50',
    };
  }
  return {
    badge: 'bg-gray-100 text-gray-700 border-gray-200',
    text: 'text-gray-600',
    bg: 'bg-white',
  };
};

const getDueText = (daysUntil: number, isPaid?: boolean): string => {
  if (isPaid) return 'Paid';
  if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`;
  if (daysUntil === 0) return 'Due today';
  if (daysUntil === 1) return 'Due tomorrow';
  return `Due in ${daysUntil} days`;
};

function BillCard({
  bill,
  currency = '₱',
  onPay,
}: {
  bill: BillReminder;
  currency?: string;
  onPay?: () => void;
}) {
  const daysUntil = getDaysUntilDue(bill.dueDate);
  const urgency = getUrgencyStyles(daysUntil, bill.isPaid);
  const dueText = getDueText(daysUntil, bill.isPaid);

  return (
    <div className={cn('p-4 rounded-xl border border-gray-200 transition-all', urgency.bg)}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
          {bill.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900 truncate">{bill.name}</h4>
            {bill.isAutoPay && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Auto
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full border', urgency.badge)}>
              {dueText}
            </span>
            <span className="text-sm text-gray-500">{bill.category}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">
            {currency}
            {bill.amount.toLocaleString()}
          </p>
          {!bill.isPaid && !bill.isAutoPay && onPay && (
            <button
              onClick={onPay}
              className="mt-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Mark Paid
            </button>
          )}
        </div>
      </div>

      {/* Progress bar for days remaining */}
      {!bill.isPaid && daysUntil >= 0 && daysUntil <= 30 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Time remaining</span>
            <span>{daysUntil} / 30 days</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                daysUntil <= 3 ? 'bg-red-500' : daysUntil <= 7 ? 'bg-orange-500' : 'bg-blue-500'
              )}
              style={{ width: `${Math.max(0, ((30 - daysUntil) / 30) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function BillReminders({ bills, currency = '₱', className, onPayBill }: BillRemindersProps) {
  const sortedBills = useMemo(() => {
    return [...bills].sort((a, b) => {
      if (a.isPaid && !b.isPaid) return 1;
      if (!a.isPaid && b.isPaid) return -1;
      return getDaysUntilDue(a.dueDate) - getDaysUntilDue(b.dueDate);
    });
  }, [bills]);

  const upcomingCount = bills.filter((b) => !b.isPaid && getDaysUntilDue(b.dueDate) <= 7).length;
  const overdueCount = bills.filter((b) => !b.isPaid && getDaysUntilDue(b.dueDate) < 0).length;
  const totalDue = bills
    .filter((b) => !b.isPaid && getDaysUntilDue(b.dueDate) <= 7)
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📅</span>
            Bill Reminders
          </span>
          {overdueCount > 0 && (
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              {overdueCount} overdue
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        {(upcomingCount > 0 || overdueCount > 0) && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Due this week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currency}
                  {totalDue.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{upcomingCount} bills</p>
                <p className="text-xs text-gray-500">coming up</p>
              </div>
            </div>
          </div>
        )}

        {/* Bill List */}
        {bills.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>No bills tracked yet</p>
            <p className="text-sm">Add your recurring bills to get reminders</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedBills.map((bill) => (
              <BillCard
                key={bill.id}
                bill={bill}
                currency={currency}
                onPay={onPayBill ? () => onPayBill(bill.id) : undefined}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact badge version
export function BillReminderBadge({
  bill,
  currency = '₱',
}: {
  bill: BillReminder;
  currency?: string;
}) {
  const daysUntil = getDaysUntilDue(bill.dueDate);
  const urgency = getUrgencyStyles(daysUntil, bill.isPaid);
  const dueText = getDueText(daysUntil, bill.isPaid);

  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-lg', urgency.bg)}>
      <span className="text-xl">{bill.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{bill.name}</p>
        <p className={cn('text-xs font-medium', urgency.text)}>{dueText}</p>
      </div>
      <span className="text-sm font-semibold text-gray-900">
        {currency}
        {bill.amount.toLocaleString()}
      </span>
    </div>
  );
}

// Demo data
export const demoBillReminders: BillReminder[] = [
  {
    id: '1',
    name: 'Meralco (Electric)',
    amount: 3500,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Utilities',
    icon: '💡',
  },
  {
    id: '2',
    name: 'Globe Postpaid',
    amount: 1299,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Phone',
    icon: '📱',
    isAutoPay: true,
  },
  {
    id: '3',
    name: 'Netflix',
    amount: 549,
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Subscription',
    icon: '🎬',
    isAutoPay: true,
  },
  {
    id: '4',
    name: 'Maynilad (Water)',
    amount: 850,
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Utilities',
    icon: '💧',
  },
  {
    id: '5',
    name: 'Rent',
    amount: 15000,
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Housing',
    icon: '🏠',
  },
];
