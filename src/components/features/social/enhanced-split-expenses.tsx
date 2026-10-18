'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SplitParticipant {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
}

interface SplitShare {
  participantId: string;
  amount: number;
  isPaid: boolean;
  paidAt?: string;
}

interface ExpenseSplit {
  id: string;
  title: string;
  totalAmount: number;
  paidBy: string;
  date: string;
  category: string;
  icon: string;
  participants: SplitParticipant[];
  shares: SplitShare[];
  notes?: string;
}

interface EnhancedSplitExpensesProps {
  splits: ExpenseSplit[];
  currentUserId: string;
  onMarkPaid?: (splitId: string, participantId: string) => void;
  onSendReminder?: (splitId: string, participantId: string) => void;
  onSettleUp?: (participantId: string) => void;
  currency?: string;
  className?: string;
}

function SplitCard({
  split,
  currentUserId,
  currency = '₱',
  onMarkPaid,
  onSendReminder,
}: {
  split: ExpenseSplit;
  currentUserId: string;
  currency?: string;
  onMarkPaid?: (participantId: string) => void;
  onSendReminder?: (participantId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const paidCount = split.shares.filter((s) => s.isPaid).length;
  const totalCollected = split.shares.filter((s) => s.isPaid).reduce((sum, s) => sum + s.amount, 0);
  const totalPending = split.totalAmount - totalCollected;
  const isPayer = split.paidBy === currentUserId;

  const myShare = split.shares.find((s) => s.participantId === currentUserId);
  const owedToMe = isPayer ? totalPending : 0;
  const iOwe = !isPayer && myShare && !myShare.isPaid ? myShare.amount : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
            {split.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{split.title}</h4>
            <p className="text-sm text-gray-500">
              {new Date(split.date).toLocaleDateString()} • {split.participants.length} people
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">{currency}{split.totalAmount.toLocaleString()}</p>
            <p className={cn(
              'text-sm',
              isPayer
                ? owedToMe > 0 ? 'text-green-600' : 'text-gray-500'
                : iOwe > 0 ? 'text-red-600' : 'text-green-600'
            )}>
              {isPayer
                ? owedToMe > 0 ? `+${currency}${owedToMe.toLocaleString()} owed` : 'Settled'
                : iOwe > 0 ? `You owe ${currency}${iOwe.toLocaleString()}` : 'Paid'
              }
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Collection Progress</span>
            <span>{paidCount}/{split.shares.length} paid</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${(paidCount / split.shares.length) * 100}%` }}
            />
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-4 space-y-3">
            {split.shares.map((share) => {
              const participant = split.participants.find((p) => p.id === share.participantId);
              if (!participant) return null;

              const isCurrentUser = share.participantId === currentUserId;
              const isPaidByCurrentUser = split.paidBy === currentUserId;

              return (
                <div
                  key={share.participantId}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg',
                    share.isPaid ? 'bg-green-50' : 'bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                      {participant.avatar || participant.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {participant.name}
                        {isCurrentUser && <span className="text-xs text-gray-500 ml-1">(You)</span>}
                        {share.participantId === split.paidBy && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            Paid
                          </span>
                        )}
                      </p>
                      {share.isPaid && share.paidAt && (
                        <p className="text-xs text-gray-500">
                          Settled on {new Date(share.paidAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'font-semibold',
                      share.isPaid ? 'text-green-600' : 'text-gray-900'
                    )}>
                      {currency}{share.amount.toLocaleString()}
                    </span>

                    {!share.isPaid && share.participantId !== split.paidBy && (
                      <>
                        {isPaidByCurrentUser && onSendReminder && (
                          <button
                            onClick={() => onSendReminder(share.participantId)}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Remind
                          </button>
                        )}
                        {(isPaidByCurrentUser || isCurrentUser) && onMarkPaid && (
                          <button
                            onClick={() => onMarkPaid(share.participantId)}
                            className="text-sm text-green-600 hover:text-green-700"
                          >
                            Mark Paid
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {split.notes && (
            <p className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-500">
              📝 {split.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function EnhancedSplitExpenses({
  splits,
  currentUserId,
  onMarkPaid,
  onSendReminder,
  onSettleUp,
  currency = '₱',
  className,
}: EnhancedSplitExpensesProps) {
  const stats = useMemo(() => {
    let youOwe = 0;
    let owedToYou = 0;

    splits.forEach((split) => {
      if (split.paidBy === currentUserId) {
        // You paid, others owe you
        split.shares.forEach((share) => {
          if (share.participantId !== currentUserId && !share.isPaid) {
            owedToYou += share.amount;
          }
        });
      } else {
        // Someone else paid, you might owe
        const myShare = split.shares.find((s) => s.participantId === currentUserId);
        if (myShare && !myShare.isPaid) {
          youOwe += myShare.amount;
        }
      }
    });

    return { youOwe, owedToYou, net: owedToYou - youOwe };
  }, [splits, currentUserId]);

  // Group by person for settle-up summary
  const balanceByPerson = useMemo(() => {
    const balances: Record<string, { name: string; balance: number }> = {};

    splits.forEach((split) => {
      split.shares.forEach((share) => {
        if (share.participantId === currentUserId) return;
        if (share.isPaid) return;

        const participant = split.participants.find((p) => p.id === share.participantId);
        if (!participant) return;

        if (!balances[share.participantId]) {
          balances[share.participantId] = { name: participant.name, balance: 0 };
        }

        if (split.paidBy === currentUserId) {
          // They owe you
          balances[share.participantId].balance += share.amount;
        } else if (split.paidBy === share.participantId) {
          // You owe them (find your share)
          const myShare = split.shares.find((s) => s.participantId === currentUserId);
          if (myShare && !myShare.isPaid) {
            balances[share.participantId].balance -= myShare.amount;
          }
        }
      });
    });

    return Object.entries(balances)
      .filter(([, v]) => v.balance !== 0)
      .map(([id, v]) => ({ id, ...v }));
  }, [splits, currentUserId]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💸</span>
          Split Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Balance Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-xs text-red-600">You Owe</p>
            <p className="text-lg font-bold text-red-700">
              {currency}{stats.youOwe.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-600">Owed to You</p>
            <p className="text-lg font-bold text-green-700">
              {currency}{stats.owedToYou.toLocaleString()}
            </p>
          </div>
          <div className={cn(
            'rounded-xl p-3 text-center',
            stats.net >= 0 ? 'bg-blue-50' : 'bg-orange-50'
          )}>
            <p className={cn('text-xs', stats.net >= 0 ? 'text-blue-600' : 'text-orange-600')}>
              Net Balance
            </p>
            <p className={cn('text-lg font-bold', stats.net >= 0 ? 'text-blue-700' : 'text-orange-700')}>
              {stats.net >= 0 ? '+' : ''}{currency}{stats.net.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Settle Up Summary */}
        {balanceByPerson.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Settle</h4>
            <div className="space-y-2">
              {balanceByPerson.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between p-2 bg-white rounded-lg"
                >
                  <span className="text-sm text-gray-700">{person.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-sm font-medium',
                      person.balance > 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {person.balance > 0 ? 'owes you ' : 'you owe '}
                      {currency}{Math.abs(person.balance).toLocaleString()}
                    </span>
                    {onSettleUp && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSettleUp(person.id)}
                      >
                        Settle
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Split List */}
        {splits.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💸</div>
            <p>No split expenses</p>
            <p className="text-sm">Split bills easily with friends</p>
          </div>
        ) : (
          <div className="space-y-3">
            {splits.map((split) => (
              <SplitCard
                key={split.id}
                split={split}
                currentUserId={currentUserId}
                currency={currency}
                onMarkPaid={onMarkPaid ? (pid) => onMarkPaid(split.id, pid) : undefined}
                onSendReminder={onSendReminder ? (pid) => onSendReminder(split.id, pid) : undefined}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { ExpenseSplit, SplitParticipant, SplitShare };
