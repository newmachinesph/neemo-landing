'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface HuluganPayment {
  id: string;
  date: string;
  amount: number;
  isPaid: boolean;
}

interface Hulugan {
  id: string;
  itemName: string;
  store: string;
  totalPrice: number;
  downPayment: number;
  monthlyPayment: number;
  startDate: string;
  totalMonths: number;
  payments: HuluganPayment[];
  icon: string;
  category: string;
}

interface HuluganTrackerProps {
  hulugans: Hulugan[];
  onMarkPaid?: (huluganId: string, paymentId: string) => void;
  currency?: string;
  className?: string;
}

const categoryIcons: Record<string, string> = {
  appliance: '📺',
  phone: '📱',
  computer: '💻',
  furniture: '🛋️',
  motorcycle: '🏍️',
  jewelry: '💍',
  other: '📦',
};

function HuluganCard({
  hulugan,
  currency = '₱',
  onMarkPaid,
}: {
  hulugan: Hulugan;
  currency?: string;
  onMarkPaid?: (paymentId: string) => void;
}) {
  const paidPayments = hulugan.payments.filter((p) => p.isPaid).length;
  const totalPaid = hulugan.downPayment + hulugan.payments.filter((p) => p.isPaid).reduce((sum, p) => sum + p.amount, 0);
  const remainingBalance = hulugan.totalPrice - totalPaid;
  const progressPercent = (totalPaid / hulugan.totalPrice) * 100;

  const nextPayment = hulugan.payments.find((p) => !p.isPaid);
  const isOverdue = nextPayment && new Date(nextPayment.date) < new Date();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
            {hulugan.icon || categoryIcons[hulugan.category] || '📦'}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{hulugan.itemName}</h3>
            <p className="text-sm text-gray-500">{hulugan.store}</p>
          </div>
          {isOverdue && (
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              Overdue
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-900">
            {paidPayments}/{hulugan.totalMonths} months ({progressPercent.toFixed(0)}%)
          </span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Total Price</p>
            <p className="font-semibold text-gray-900">{currency}{hulugan.totalPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Remaining</p>
            <p className="font-semibold text-orange-600">{currency}{remainingBalance.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Monthly Payment</p>
            <p className="font-semibold text-gray-900">{currency}{hulugan.monthlyPayment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Paid So Far</p>
            <p className="font-semibold text-green-600">{currency}{totalPaid.toLocaleString()}</p>
          </div>
        </div>

        {/* Next Payment */}
        {nextPayment && (
          <div className={cn(
            'p-3 rounded-lg flex items-center justify-between',
            isOverdue ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
          )}>
            <div>
              <p className="text-xs text-gray-500">Next Payment Due</p>
              <p className={cn('font-medium', isOverdue ? 'text-red-700' : 'text-yellow-700')}>
                {new Date(nextPayment.date).toLocaleDateString('en-PH', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{currency}{nextPayment.amount.toLocaleString()}</p>
              {onMarkPaid && (
                <button
                  onClick={() => onMarkPaid(nextPayment.id)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark Paid
                </button>
              )}
            </div>
          </div>
        )}

        {!nextPayment && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-700 font-medium flex items-center justify-center gap-2">
              <span>🎉</span>
              Fully Paid! Congratulations!
            </p>
          </div>
        )}
      </div>

      {/* Payment History Toggle */}
      <details className="border-t border-gray-100">
        <summary className="px-4 py-3 text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
          View Payment History ({paidPayments} payments made)
        </summary>
        <div className="px-4 pb-4 space-y-2 max-h-40 overflow-y-auto">
          {hulugan.payments.map((payment, index) => (
            <div
              key={payment.id}
              className={cn(
                'flex items-center justify-between py-2 px-3 rounded-lg text-sm',
                payment.isPaid ? 'bg-green-50' : 'bg-gray-50'
              )}
            >
              <div className="flex items-center gap-2">
                {payment.isPaid ? (
                  <span className="text-green-500">✓</span>
                ) : (
                  <span className="text-gray-400">○</span>
                )}
                <span className="text-gray-600">Month {index + 1}</span>
              </div>
              <div className="text-right">
                <span className={payment.isPaid ? 'text-green-600' : 'text-gray-400'}>
                  {currency}{payment.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

export function HuluganTracker({
  hulugans,
  onMarkPaid,
  currency = '₱',
  className,
}: HuluganTrackerProps) {
  const stats = useMemo(() => {
    const totalRemaining = hulugans.reduce((sum, h) => {
      const paid = h.downPayment + h.payments.filter((p) => p.isPaid).reduce((s, p) => s + p.amount, 0);
      return sum + (h.totalPrice - paid);
    }, 0);

    const monthlyDue = hulugans.reduce((sum, h) => {
      const hasUnpaid = h.payments.some((p) => !p.isPaid);
      return sum + (hasUnpaid ? h.monthlyPayment : 0);
    }, 0);

    return { totalRemaining, monthlyDue, activeCount: hulugans.filter((h) => h.payments.some((p) => !p.isPaid)).length };
  }, [hulugans]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📋</span>
          Hulugan Tracker
          <span className="text-sm font-normal text-gray-500">(Installment Payments)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-600 mb-1">Active Items</p>
            <p className="text-xl font-bold text-blue-700">{stats.activeCount}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xs text-orange-600 mb-1">Monthly Due</p>
            <p className="text-lg font-bold text-orange-700">
              {currency}{stats.monthlyDue.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <p className="text-xs text-purple-600 mb-1">Total Balance</p>
            <p className="text-lg font-bold text-purple-700">
              {currency}{stats.totalRemaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Hulugan Cards */}
        {hulugans.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📦</div>
            <p>No installment items tracked</p>
            <p className="text-sm">Add items you&apos;re paying off monthly</p>
          </div>
        ) : (
          <div className="space-y-4">
            {hulugans.map((hulugan) => (
              <HuluganCard
                key={hulugan.id}
                hulugan={hulugan}
                currency={currency}
                onMarkPaid={onMarkPaid ? (paymentId) => onMarkPaid(hulugan.id, paymentId) : undefined}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { Hulugan, HuluganPayment };
