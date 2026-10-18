'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Transaction } from '@/types';
import { ArrowRightIcon, ArrowUpIcon, ArrowDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recentTransactions = transactions.slice(0, 5);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowDownIcon className="w-4 h-4 text-green-600" />;
      case 'expense':
        return <ArrowUpIcon className="w-4 h-4 text-red-600" />;
      case 'transfer':
        return <ArrowsRightLeftIcon className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'income':
        return 'bg-green-50';
      case 'expense':
        return 'bg-red-50';
      case 'transfer':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getAmountDisplay = (transaction: Transaction) => {
    const prefix = transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : '';
    const color = transaction.type === 'income' ? 'text-green-600' : transaction.type === 'expense' ? 'text-red-600' : 'text-blue-600';
    return (
      <span className={`font-semibold ${color}`}>
        {prefix}{formatCurrency(transaction.amount)}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link
          href="/transactions"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getTransactionColor(transaction.type)}`}>
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{transaction.category}</span>
                    <span className="text-xs text-gray-400">&bull;</span>
                    <span className="text-xs text-gray-500">{formatDate(transaction.date, 'relative')}</span>
                  </div>
                </div>
              </div>
              {getAmountDisplay(transaction)}
            </div>
          ))}

          {recentTransactions.length === 0 && (
            <div className="text-center py-6">
              <ArrowsRightLeftIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No transactions yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
