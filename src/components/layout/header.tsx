'use client';

import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, NotificationBell } from '@/components/ui';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 lg:hidden transition-colors"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        {/* Search */}
        <div className="hidden sm:block">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 h-10 pl-10 pr-4 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b91c4a] focus:border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <NotificationBell />

        {/* Add transaction button */}
        <Button size="sm" className="hidden sm:flex">
          Add Transaction
        </Button>
      </div>
    </header>
  );
}
