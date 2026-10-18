'use client';

import type { AdminStats } from '@/actions/admin';

export function StatsCards({ stats }: { stats: AdminStats }) {
  const cards = [
    { label: 'Total Subscribers', value: stats.totalSubscribers, color: 'text-[#f58560]' },
    { label: 'New Today', value: stats.subscribersToday, color: 'text-green-500' },
    { label: 'Total Messages', value: stats.totalContacts, color: 'text-[#9b1b3c] dark:text-[#f58560]' },
    { label: 'Unread Messages', value: stats.unreadContacts, color: 'text-amber-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="p-5 rounded-xl bg-white dark:bg-white/[0.06] border border-gray-200 dark:border-white/10"
        >
          <p className="text-sm text-gray-500 dark:text-white/50 mb-1">{card.label}</p>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
