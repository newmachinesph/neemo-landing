'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { Account } from '@/types';
import {
  ArrowRightIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  BanknotesIcon,
  WalletIcon
} from '@heroicons/react/24/outline';

interface AccountsOverviewProps {
  accounts: Account[];
}

export function AccountsOverview({ accounts }: AccountsOverviewProps) {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
      case 'savings':
        return <BuildingLibraryIcon className="w-5 h-5" />;
      case 'credit_card':
        return <CreditCardIcon className="w-5 h-5" />;
      case 'cash':
        return <BanknotesIcon className="w-5 h-5" />;
      case 'digital_wallet':
      case 'investment':
        return <WalletIcon className="w-5 h-5" />;
      default:
        return <BuildingLibraryIcon className="w-5 h-5" />;
    }
  };

  const formatAccountType = (type: string) => {
    return type.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Accounts</CardTitle>
        <Link
          href="/settings"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          Manage
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Total balance */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white">
            <p className="text-sm text-blue-100">Total Balance</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(totalBalance)}</p>
          </div>

          {/* Account list */}
          <div className="space-y-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg"
                    style={{
                      backgroundColor: `${account.color}20`,
                      color: account.color
                    }}
                  >
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{account.name}</p>
                    <p className="text-xs text-gray-500">{formatAccountType(account.type)}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${account.balance < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatCurrency(account.balance)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
