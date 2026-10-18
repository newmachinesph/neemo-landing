'use client';

import { useState, useRef } from 'react';
import { formatCurrency } from '@/lib/utils';
import { PlusIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface Account {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'cash' | 'card' | 'savings';
  balance: number;
  lastFour?: string;
  color: string;
  icon: string;
  logo?: string;
}

interface AccountCardsProps {
  accounts: Account[];
  showBalance?: boolean;
  onToggleBalance?: () => void;
  onAddAccount?: () => void;
}

// Default accounts for demo
const defaultAccounts: Account[] = [
  {
    id: '1',
    name: 'BDO Savings',
    type: 'bank',
    balance: 45230.50,
    lastFour: '4521',
    color: 'from-blue-600 to-blue-800',
    icon: '🏦',
  },
  {
    id: '2',
    name: 'GCash',
    type: 'ewallet',
    balance: 12500.00,
    lastFour: '8923',
    color: 'from-blue-500 to-cyan-500',
    icon: '📱',
  },
  {
    id: '3',
    name: 'Maya',
    type: 'ewallet',
    balance: 8750.25,
    lastFour: '1456',
    color: 'from-[#b91c4a] to-[#9b1b3c]',
    icon: '💚',
  },
  {
    id: '4',
    name: 'Cash on Hand',
    type: 'cash',
    balance: 5000.00,
    color: 'from-amber-500 to-orange-600',
    icon: '💵',
  },
  {
    id: '5',
    name: 'Emergency Fund',
    type: 'savings',
    balance: 150000.00,
    color: 'from-purple-500 to-purple-700',
    icon: '🐷',
  },
];

export function AccountCards({
  accounts = defaultAccounts,
  showBalance = true,
  onToggleBalance,
  onAddAccount,
}: AccountCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.75; // 75% card width
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, accounts.length));
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const getTypeLabel = (type: Account['type']) => {
    switch (type) {
      case 'bank': return 'Bank Account';
      case 'ewallet': return 'E-Wallet';
      case 'cash': return 'Cash';
      case 'card': return 'Credit Card';
      case 'savings': return 'Savings';
      default: return 'Account';
    }
  };

  return (
    <div className="w-full">
      {/* Total Balance Header */}
      <div className="px-5 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Total Balance</span>
              <button
                onClick={onToggleBalance}
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                {showBalance ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-3xl font-bold text-white mt-0.5">
              {showBalance ? formatCurrency(totalBalance) : '₱ ••••••'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs">{accounts.length} accounts</p>
          </div>
        </div>
      </div>

      {/* Swipeable Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {accounts.map((account, index) => (
          <div
            key={account.id}
            className="snap-start shrink-0 w-[75%] max-w-[280px]"
          >
            <div
              className={`relative h-[160px] rounded-2xl p-4 bg-gradient-to-br ${account.color} shadow-lg overflow-hidden`}
            >
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between">
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{account.icon}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">{account.name}</p>
                      <p className="text-white/60 text-xs">{getTypeLabel(account.type)}</p>
                    </div>
                  </div>
                  {account.lastFour && (
                    <p className="text-white/50 text-xs font-mono">•••• {account.lastFour}</p>
                  )}
                </div>

                {/* Bottom Row - Balance */}
                <div>
                  <p className="text-white/60 text-xs mb-0.5">Available Balance</p>
                  <p className="text-white text-2xl font-bold">
                    {showBalance ? formatCurrency(account.balance) : '₱ ••••'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Account Card */}
        <div className="snap-start shrink-0 w-[75%] max-w-[280px]">
          <button
            onClick={onAddAccount}
            className="w-full h-[160px] rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:border-white/40 hover:bg-white/5 transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <PlusIcon className="w-6 h-6 text-white/60" />
            </div>
            <span className="text-white/60 text-sm font-medium">Add Account</span>
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-1">
        {[...accounts, { id: 'add' }].map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-4 bg-[#f58560]'
                : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
