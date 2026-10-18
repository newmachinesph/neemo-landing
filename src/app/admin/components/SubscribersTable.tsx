'use client';

import type { Subscriber } from '@/actions/admin';
import { deleteSubscriber } from '@/actions/admin';
import { DeleteButton } from './DeleteButton';

export function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Newsletter Subscribers ({subscribers.length})
      </h2>

      {subscribers.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-white dark:bg-white/[0.06] border border-gray-200 dark:border-white/10">
          <p className="text-gray-500 dark:text-white/50">No subscribers yet.</p>
        </div>
      ) : (
        <div className="rounded-xl bg-white dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Email</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Source</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Date</th>
                  <th className="text-right p-4 font-medium text-gray-500 dark:text-white/50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="p-4 text-gray-900 dark:text-white font-medium">{sub.email}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60">
                        {sub.source === 'landing_hero' ? 'Hero' : 'CTA'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 dark:text-white/50">
                      {new Date(sub.subscribed_at).toLocaleDateString('en-PH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <DeleteButton id={sub.id} action={deleteSubscriber} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
