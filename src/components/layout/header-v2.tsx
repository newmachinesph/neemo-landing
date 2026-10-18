'use client';

import { useState, useRef } from 'react';
import { BellIcon, Cog6ToothIcon, PlusIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils';

interface Account {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'cash' | 'card' | 'savings';
  balance: number;
  lastFour?: string;
  color: string;
  icon: string;
}

interface HeaderV2Props {
  userName?: string;
  avatarInitials?: string;
  showNotification?: boolean;
  accounts?: Account[];
  showBalance?: boolean;
  onToggleBalance?: () => void;
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
    color: 'from-blue-400 to-blue-600',
    icon: '📱',
  },
  {
    id: '3',
    name: 'Maya',
    type: 'ewallet',
    balance: 8750.25,
    lastFour: '1456',
    color: 'from-[#00d26a] to-[#00a854]',
    icon: '💚',
  },
  {
    id: '4',
    name: 'Cash on Hand',
    type: 'cash',
    balance: 5000.00,
    color: 'from-amber-500 to-orange-500',
    icon: '💵',
  },
  {
    id: '5',
    name: 'Ipon Fund',
    type: 'savings',
    balance: 150000.00,
    color: 'from-purple-500 to-purple-700',
    icon: '🐷',
  },
];

export function HeaderV2({
  userName = 'Juan',
  avatarInitials = 'JD',
  showNotification = true,
  accounts = defaultAccounts,
  showBalance: externalShowBalance,
  onToggleBalance: externalToggleBalance,
}: HeaderV2Props) {
  const [internalShowBalance, setInternalShowBalance] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showBalance = externalShowBalance ?? internalShowBalance;
  const toggleBalance = externalToggleBalance ?? (() => setInternalShowBalance(!internalShowBalance));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 260 + 12; // card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, accounts.length));
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const getTypeLabel = (type: Account['type']) => {
    switch (type) {
      case 'bank': return 'Bank';
      case 'ewallet': return 'E-Wallet';
      case 'cash': return 'Cash';
      case 'card': return 'Card';
      case 'savings': return 'Savings';
      default: return 'Account';
    }
  };

  return (
    <header
      className="bg-gradient-to-br from-[#4a0d24] via-[#33081a] to-[#2f0a18] text-white"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Top Bar */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          {/* Left - Avatar and Greeting */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#f58560] to-[#d4365e] flex items-center justify-center shadow-lg shadow-[#f58560]/30">
                <span className="text-[#2f0a18] font-bold text-base">{avatarInitials}</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#d4365e] rounded-sm border-2 border-[#33081a]" />
            </div>
            <div>
              <p className="text-white/50 text-xs">{getGreeting()},</p>
              <h1 className="text-base font-bold">{userName}! 👋</h1>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {showNotification && (
              <button className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all">
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            )}
            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all">
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Total Balance */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-sm">Total Balance</span>
          <button onClick={toggleBalance} className="text-white/40 hover:text-white/60 transition-colors">
            {showBalance ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-3xl font-bold text-white">
          {showBalance ? formatCurrency(totalBalance) : '₱ ••••••'}
        </p>
        <p className="text-white/40 text-xs mt-0.5">{accounts.length} accounts</p>
      </div>

      {/* Swipeable Account Cards */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto pb-5 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: '20px', scrollPaddingLeft: '20px' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {accounts.map((account) => (
          <div
            key={account.id}
            className="snap-start shrink-0 w-[260px]"
          >
            <div
              className={`relative h-[130px] rounded-lg py-4 pl-6 pr-4 bg-gradient-to-br ${account.color} shadow-lg overflow-hidden`}
            >
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-[0.08]">
                <div className="absolute top-0 right-0 w-28 h-28 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between">
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{account.icon}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">{account.name}</p>
                      <p className="text-white/60 text-[10px]">{getTypeLabel(account.type)}</p>
                    </div>
                  </div>
                  {account.lastFour && (
                    <p className="text-white/40 text-[10px] font-mono">•••• {account.lastFour}</p>
                  )}
                </div>

                {/* Bottom Row - Balance */}
                <div>
                  <p className="text-white/50 text-[10px] mb-0.5">Balance</p>
                  <p className="text-white text-xl font-bold">
                    {showBalance ? formatCurrency(account.balance) : '₱ ••••'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Account Card */}
        <div className="snap-start shrink-0 w-[260px]">
          <button className="w-full h-[130px] rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:border-white/40 hover:bg-white/5 transition-all active:scale-95">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <PlusIcon className="w-5 h-5 text-white/60" />
            </div>
            <span className="text-white/50 text-xs font-medium">Add Account</span>
          </button>
        </div>

          {/* Right spacer */}
          <div className="shrink-0 w-5" />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 pb-4">
        {[...accounts, { id: 'add' }].map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-4 bg-[#f58560]'
                : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </header>
  );
}
