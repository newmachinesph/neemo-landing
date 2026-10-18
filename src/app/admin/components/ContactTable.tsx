'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { ContactSubmission } from '@/actions/admin';
import { deleteContactSubmission, markContactAsRead } from '@/actions/admin';
import { DeleteButton } from './DeleteButton';

const reasonLabels: Record<string, string> = {
  general: 'General',
  support: 'Support',
  bug: 'Bug Report',
  feature: 'Feature Request',
};

export function ContactTable({ contacts }: { contacts: ContactSubmission[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Contact Submissions ({contacts.length})
      </h2>

      {contacts.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-white dark:bg-white/[0.06] border border-gray-200 dark:border-white/10">
          <p className="text-gray-500 dark:text-white/50">No messages yet.</p>
        </div>
      ) : (
        <div className="rounded-xl bg-white dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Status</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Name</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Email</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Subject</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Reason</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-white/50">Date</th>
                  <th className="text-right p-4 font-medium text-gray-500 dark:text-white/50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <ContactRow
                    key={contact.id}
                    contact={contact}
                    isExpanded={expandedId === contact.id}
                    onToggle={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactRow({
  contact,
  isExpanded,
  onToggle,
}: {
  contact: ContactSubmission;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleMarkRead = () => {
    startTransition(async () => {
      await markContactAsRead(contact.id);
      router.refresh();
    });
  };

  return (
    <>
      <tr
        onClick={onToggle}
        className={`border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors ${
          !contact.is_read ? 'border-l-2 border-l-[#f58560]' : ''
        }`}
      >
        <td className="p-4">
          {contact.is_read ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/40">
              Read
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#fce4e8] dark:bg-[#f58560]/15 text-[#9b1b3c] dark:text-[#f58560]">
              New
            </span>
          )}
        </td>
        <td className="p-4 text-gray-900 dark:text-white font-medium">{contact.name}</td>
        <td className="p-4 text-gray-500 dark:text-white/60">{contact.email}</td>
        <td className="p-4 text-gray-900 dark:text-white">{contact.subject}</td>
        <td className="p-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60">
            {reasonLabels[contact.contact_reason] || contact.contact_reason}
          </span>
        </td>
        <td className="p-4 text-gray-500 dark:text-white/50 whitespace-nowrap">
          {new Date(contact.submitted_at).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </td>
        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-end gap-3">
            {!contact.is_read && (
              <button
                onClick={handleMarkRead}
                disabled={isPending}
                className="text-sm text-[#9b1b3c] dark:text-[#f58560] hover:text-[#831530] dark:hover:text-[#f79b7a] disabled:opacity-50 transition-colors"
              >
                {isPending ? '...' : 'Mark Read'}
              </button>
            )}
            <DeleteButton id={contact.id} action={deleteContactSubmission} />
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50 dark:bg-white/[0.02]">
          <td colSpan={7} className="p-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-gray-500 dark:text-white/50 mb-2">Message:</p>
              <p className="text-sm text-gray-700 dark:text-white/70 whitespace-pre-wrap">{contact.message}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
