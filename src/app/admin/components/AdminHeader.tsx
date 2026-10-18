'use client';

import Link from 'next/link';
import { logout } from '@/actions/auth';

export function AdminHeader({ email }: { email: string }) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-white/10 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Neemo Admin</h1>
        <p className="text-sm text-gray-500 dark:text-white/50">Signed in as {email}</p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-sm font-medium text-[#9b1b3c] dark:text-[#f58560] hover:text-[#831530] dark:hover:text-[#f79b7a] transition-colors"
        >
          &larr; Back to Site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm font-medium text-gray-500 dark:text-white/50 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
