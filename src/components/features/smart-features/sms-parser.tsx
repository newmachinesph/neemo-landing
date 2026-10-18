'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ParsedTransaction {
  id: string;
  rawMessage: string;
  bank: string;
  type: 'debit' | 'credit' | 'transfer' | 'payment';
  amount: number;
  balance?: number;
  merchant?: string;
  reference?: string;
  date: string;
  isVerified: boolean;
}

interface SMSParserProps {
  parsedTransactions?: ParsedTransaction[];
  className?: string;
}

const demoTransactions: ParsedTransaction[] = [
  {
    id: 'sms1',
    rawMessage: 'BDO: You have made a POS purchase of PHP 1,250.00 at LAZADA PH on 01/15/24. Avail bal: PHP 45,678.90',
    bank: 'BDO',
    type: 'debit',
    amount: 1250,
    balance: 45678.90,
    merchant: 'LAZADA PH',
    date: '2024-01-15',
    isVerified: true,
  },
  {
    id: 'sms2',
    rawMessage: 'GCash: You sent PHP 500.00 to Juan dela Cruz. Ref#: 1234567890. Your GCash balance is PHP 2,345.67',
    bank: 'GCash',
    type: 'transfer',
    amount: 500,
    balance: 2345.67,
    merchant: 'Juan dela Cruz',
    reference: '1234567890',
    date: '2024-01-15',
    isVerified: true,
  },
  {
    id: 'sms3',
    rawMessage: 'BPI: Payment received - PHP 35,000.00 from ABC COMPANY on 01/15/24. Current balance: PHP 78,900.00',
    bank: 'BPI',
    type: 'credit',
    amount: 35000,
    balance: 78900,
    merchant: 'ABC COMPANY',
    date: '2024-01-15',
    isVerified: true,
  },
  {
    id: 'sms4',
    rawMessage: 'Maya: Payment of PHP 850.00 to MERALCO was successful. Ref: 9876543210',
    bank: 'Maya',
    type: 'payment',
    amount: 850,
    merchant: 'MERALCO',
    reference: '9876543210',
    date: '2024-01-14',
    isVerified: true,
  },
  {
    id: 'sms5',
    rawMessage: 'Metrobank: ATM withdrawal PHP 5,000.00 at SM MEGAMALL on 01/14/24. Balance: PHP 12,345.00',
    bank: 'Metrobank',
    type: 'debit',
    amount: 5000,
    balance: 12345,
    merchant: 'ATM SM MEGAMALL',
    date: '2024-01-14',
    isVerified: true,
  },
];

const supportedBanks = [
  { name: 'BDO', logo: '🏦', color: 'blue' },
  { name: 'BPI', logo: '🏛️', color: 'red' },
  { name: 'Metrobank', logo: '🏢', color: 'purple' },
  { name: 'GCash', logo: '💙', color: 'blue' },
  { name: 'Maya', logo: '💚', color: 'green' },
  { name: 'UnionBank', logo: '🔶', color: 'orange' },
  { name: 'Security Bank', logo: '🔐', color: 'teal' },
  { name: 'RCBC', logo: '🔴', color: 'red' },
];

export function SMSParser({
  parsedTransactions = demoTransactions,
  className,
}: SMSParserProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'debit' | 'credit'>('all');

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
    }, 2000);
  };

  const filteredTransactions = parsedTransactions.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'debit') return t.type === 'debit' || t.type === 'payment' || t.type === 'transfer';
    if (filter === 'credit') return t.type === 'credit';
    return true;
  });

  const totalDebits = parsedTransactions
    .filter((t) => t.type === 'debit' || t.type === 'payment' || t.type === 'transfer')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCredits = parsedTransactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'debit': return '💳';
      case 'credit': return '💰';
      case 'transfer': return '↔️';
      case 'payment': return '📝';
      default: return '💵';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'credit': return 'text-green-600 bg-green-50';
      case 'debit':
      case 'payment':
      case 'transfer': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📱</span>
          SMS Transaction Parser
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Import Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-900">Auto-Import SMS</h4>
              <p className="text-xs text-gray-500">
                Automatically parse bank SMS notifications
              </p>
            </div>
            <button
              onClick={handleImport}
              disabled={isImporting}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isImporting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isImporting ? 'Importing...' : 'Import SMS'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {supportedBanks.map((bank) => (
              <span
                key={bank.name}
                className="px-2 py-1 text-xs bg-white rounded-full border border-gray-200"
              >
                {bank.logo} {bank.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">Transactions</p>
            <p className="text-xl font-bold text-gray-900">{parsedTransactions.length}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-xs text-red-600 mb-1">Total Out</p>
            <p className="text-xl font-bold text-red-700">₱{totalDebits.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Total In</p>
            <p className="text-xl font-bold text-green-700">₱{totalCredits.toLocaleString()}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {(['all', 'debit', 'credit'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : f === 'debit' ? 'Money Out' : 'Money In'}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-3 mb-6">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getTypeColor(transaction.type)}`}>
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{transaction.merchant || 'Unknown'}</p>
                      {transaction.isVerified && (
                        <span className="text-green-500 text-xs">✓</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {transaction.bank} • {new Date(transaction.date).toLocaleDateString('en-PH', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₱{transaction.amount.toLocaleString()}
                  </p>
                  {transaction.balance && (
                    <p className="text-xs text-gray-500">
                      Bal: ₱{transaction.balance.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Raw Message */}
              <div className="mt-3 p-2 bg-white rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 font-mono break-all">
                  {transaction.rawMessage}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium hover:bg-blue-200 transition-colors">
                  Add to Expenses
                </button>
                <button className="py-1.5 px-3 bg-gray-200 text-gray-700 text-xs rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  Edit
                </button>
                <button className="py-1.5 px-3 bg-gray-200 text-gray-700 text-xs rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  Ignore
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Note */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <span>🔒</span> Privacy First
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• SMS is processed locally on your device</li>
            <li>• Only transaction data is extracted</li>
            <li>• No messages are stored on servers</li>
            <li>• You control what gets imported</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
