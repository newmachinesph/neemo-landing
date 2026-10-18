'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggleCompact } from '@/components/ui/theme-toggle';
import {
  HomeIcon,
  BanknotesIcon,
  FlagIcon,
  ArrowsRightLeftIcon,
  BellAlertIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
  SparklesIcon,
  UserGroupIcon,
  TrophyIcon,
  DocumentChartBarIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';

// Simplified navigation for mobile-first V2 dashboard
const menuItems = [
  {
    section: 'Main',
    items: [
      { name: 'Dashboard', href: '/dashboard-v2', icon: HomeIcon, emoji: '🏠' },
      { name: 'Budget', href: '/dashboard/budget', icon: BanknotesIcon, emoji: '💰' },
      { name: 'Goals', href: '/dashboard/goals', icon: FlagIcon, emoji: '🎯' },
      { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowsRightLeftIcon, emoji: '📋' },
      { name: 'Bills', href: '/dashboard/bills', icon: BellAlertIcon, emoji: '📝' },
    ],
  },
  {
    section: 'Filipino Features',
    items: [
      { name: 'Paluwagan', href: '/dashboard/paluwagan', icon: UserGroupIcon, emoji: '🤝' },
      { name: '13th Month', href: '/dashboard/thirteenth-month', icon: CalculatorIcon, emoji: '🎄' },
      { name: 'Digital Piggy Bank', href: '/dashboard/alkansya', icon: BanknotesIcon, emoji: '🐷' },
    ],
  },
  {
    section: 'Reports & Tools',
    items: [
      { name: 'Monthly Report', href: '/dashboard/reports/monthly', icon: DocumentChartBarIcon, emoji: '📊' },
      { name: 'Insights', href: '/dashboard/smart-insights', icon: SparklesIcon, emoji: '✨' },
      { name: 'Achievements', href: '/dashboard/achievements', icon: TrophyIcon, emoji: '🏆' },
      { name: 'Net Worth', href: '/dashboard/net-worth', icon: ChartBarIcon, emoji: '📈' },
    ],
  },
];

interface SidebarV2Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarV2({ isOpen, onClose }: SidebarV2Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-gradient-to-b dark:from-[#4a0d24] dark:to-[#3d0a1e] transform transition-transform duration-300 ease-out shadow-2xl flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#b91c4a] to-[#f58560] rounded-xl shadow-lg shadow-[#b91c4a]/25">
              <span className="text-lg font-bold text-[#2f0a18]">₱</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Neemo</h2>
              <p className="text-xs text-gray-500 dark:text-white/50">Simple Mode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {menuItems.map((group) => (
            <div key={group.section} className="mb-6">
              <p className="px-3 mb-2 text-xs font-bold text-gray-400 dark:text-white/40 uppercase tracking-wider">
                {group.section}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-2xl text-base transition-all duration-200 active:scale-98',
                        isActive
                          ? 'bg-[#f58560]/20 dark:bg-[#f58560]/15 text-[#9b1b3c] dark:text-[#f58560] font-semibold'
                          : 'text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10'
                      )}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-[#f58560]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-3">
          {/* Settings Link */}
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 rounded-2xl text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <Cog6ToothIcon className="w-6 h-6" />
            <span className="font-medium">Settings</span>
          </Link>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#f58560] to-[#b91c4a] shadow-lg shadow-[#f58560]/25">
              <span className="text-lg font-bold text-[#2f0a18]">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                Juan Dela Cruz
              </p>
              <p className="text-xs text-gray-500 dark:text-white/50 truncate">
                juan@email.com
              </p>
            </div>
            <ThemeToggleCompact />
          </div>

          {/* Switch to Full Dashboard */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/20 text-gray-500 dark:text-white/50 hover:border-[#f58560] hover:text-[#9b1b3c] dark:hover:text-[#f58560] transition-colors"
          >
            <span>Full Dashboard →</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
