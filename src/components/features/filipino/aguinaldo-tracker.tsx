'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Aguinaldo {
  id: string;
  type: 'given' | 'received';
  recipient?: string;
  giver?: string;
  amount: number;
  relationship: string;
  date: string;
  notes?: string;
  isCash: boolean;
}

interface AguinaldoTrackerProps {
  aguinaldos: Aguinaldo[];
  onAdd?: (aguinaldo: Omit<Aguinaldo, 'id'>) => void;
  currency?: string;
  year?: number;
  className?: string;
}

const relationshipIcons: Record<string, string> = {
  inaanak: '👶',
  parent: '👨‍👩‍👧',
  sibling: '👫',
  grandparent: '👴',
  aunt_uncle: '👨‍👧',
  cousin: '🧑‍🤝‍🧑',
  friend: '🤝',
  employee: '💼',
  neighbor: '🏠',
  other: '🎁',
};

const commonAmounts = [20, 50, 100, 200, 500, 1000];

export function AguinaldoTracker({
  aguinaldos,
  onAdd,
  currency = '₱',
  year = new Date().getFullYear(),
  className,
}: AguinaldoTrackerProps) {
  const stats = useMemo(() => {
    const given = aguinaldos.filter((a) => a.type === 'given');
    const received = aguinaldos.filter((a) => a.type === 'received');

    return {
      totalGiven: given.reduce((sum, a) => sum + a.amount, 0),
      totalReceived: received.reduce((sum, a) => sum + a.amount, 0),
      givenCount: given.length,
      receivedCount: received.length,
      byRelationship: Object.entries(
        aguinaldos.reduce((acc, a) => {
          const key = a.relationship;
          if (!acc[key]) acc[key] = { given: 0, received: 0 };
          acc[key][a.type] += a.amount;
          return acc;
        }, {} as Record<string, { given: number; received: number }>)
      ),
    };
  }, [aguinaldos]);

  const netAguinaldo = stats.totalReceived - stats.totalGiven;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🧧</span>
          Aguinaldo Tracker {year}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Net Summary */}
        <div className="mb-6 p-6 bg-gradient-to-r from-red-50 to-green-50 rounded-xl text-center">
          <p className="text-sm text-gray-600 mb-2">Net Aguinaldo</p>
          <p className={cn(
            'text-4xl font-bold',
            netAguinaldo >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {netAguinaldo >= 0 ? '+' : ''}{currency}{netAguinaldo.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {netAguinaldo >= 0 ? '🎉 Swerte ka!' : '🤗 Generous ka naman!'}
          </p>
        </div>

        {/* Given vs Received */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎁</span>
              <span className="text-sm font-medium text-red-700">Given</span>
            </div>
            <p className="text-2xl font-bold text-red-600">
              {currency}{stats.totalGiven.toLocaleString()}
            </p>
            <p className="text-xs text-red-500 mt-1">{stats.givenCount} people</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🧧</span>
              <span className="text-sm font-medium text-green-700">Received</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {currency}{stats.totalReceived.toLocaleString()}
            </p>
            <p className="text-xs text-green-500 mt-1">{stats.receivedCount} people</p>
          </div>
        </div>

        {/* By Relationship */}
        {stats.byRelationship.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">By Relationship</h4>
            <div className="space-y-2">
              {stats.byRelationship.map(([relationship, amounts]) => (
                <div
                  key={relationship}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{relationshipIcons[relationship] || '🎁'}</span>
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {relationship.replace('_', '/')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    {amounts.given > 0 && (
                      <span className="text-red-600">
                        -{currency}{amounts.given.toLocaleString()}
                      </span>
                    )}
                    {amounts.received > 0 && (
                      <span className="text-green-600">
                        +{currency}{amounts.received.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent History */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
          {aguinaldos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🧧</div>
              <p>No aguinaldo recorded yet</p>
              <p className="text-sm">Track your Christmas cash gifts!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {aguinaldos.slice(0, 10).map((aguinaldo) => (
                <div
                  key={aguinaldo.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg',
                    aguinaldo.type === 'given' ? 'bg-red-50' : 'bg-green-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {relationshipIcons[aguinaldo.relationship] || '🎁'}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {aguinaldo.type === 'given'
                          ? `To ${aguinaldo.recipient}`
                          : `From ${aguinaldo.giver}`}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {aguinaldo.relationship.replace('_', '/')}
                        {aguinaldo.isCash ? '' : ' (in-kind)'}
                      </p>
                    </div>
                  </div>
                  <p className={cn(
                    'font-semibold',
                    aguinaldo.type === 'given' ? 'text-red-600' : 'text-green-600'
                  )}>
                    {aguinaldo.type === 'given' ? '-' : '+'}
                    {currency}{aguinaldo.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Reference */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
          <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <span>💡</span>
            Suggested Amounts
          </h4>
          <div className="flex flex-wrap gap-2">
            {commonAmounts.map((amount) => (
              <span
                key={amount}
                className="px-3 py-1 bg-white border border-yellow-200 rounded-full text-sm text-yellow-700"
              >
                {currency}{amount}
              </span>
            ))}
          </div>
          <p className="text-xs text-yellow-600 mt-2">
            Common aguinaldo amounts for inaanaks and family members
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export type { Aguinaldo };
